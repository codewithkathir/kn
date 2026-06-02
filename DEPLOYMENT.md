# Deployment Guide

Pipeline:

```
GitHub (codewithkathir/kn)
       │  git pull
       ▼
   VPS  ──►  Node `serve` on :9000  ──►  nginx :80/:443  ──►  GoDaddy DNS  ──►  user
                  (managed by PM2)        (reverse proxy)        (A record)
```

---

## 1. One-time VPS setup (Ubuntu/Debian)

SSH into the VPS as a sudo user, then:

```bash
# 1. System packages
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl ufw nginx

# 2. Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 3. PM2 (process manager)
sudo npm install -g pm2

# 4. Firewall
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'      # opens 80 + 443
sudo ufw --force enable
# NOTE: do NOT open 9000 — only nginx (localhost) should reach it.
```

---

## 2. Clone the repo on the VPS

```bash
sudo mkdir -p /var/www
sudo chown -R $USER:$USER /var/www
cd /var/www
git clone https://github.com/codewithkathir/kn.git
cd kn

npm ci --omit=dev || npm install --omit=dev

# Start with PM2
pm2 start ecosystem.config.js
pm2 save

# Make PM2 start on boot
pm2 startup systemd -u $USER --hp /home/$USER
# Run the command pm2 prints (it will sudo for you).
```

Verify locally on the VPS:

```bash
curl -I http://127.0.0.1:9000        # should return 200 OK
pm2 status                           # kn-portfolio: online
pm2 logs kn-portfolio --lines 50
```

---

## 3. Point GoDaddy DNS at the VPS

In **GoDaddy → My Products → DNS** for your domain, set:

| Type  | Name | Value           | TTL  |
|-------|------|-----------------|------|
| A     | @    | `<VPS_IPv4>`    | 600  |
| A     | www  | `<VPS_IPv4>`    | 600  |

(If GoDaddy's *Domain Forwarding* is on, turn it OFF — it conflicts with A records.)

Wait for propagation (usually 5–30 min). Verify:

```bash
dig +short YOUR_DOMAIN.com
dig +short www.YOUR_DOMAIN.com
```

Both must return your VPS IP.

---

## 4. Configure nginx

```bash
# Copy the template from the repo
sudo cp /var/www/kn/deploy/nginx.conf \
        /etc/nginx/sites-available/kathiravan-portfolio

# Edit: replace YOUR_DOMAIN.com with your real domain
sudo nano /etc/nginx/sites-available/kathiravan-portfolio

# Enable the site
sudo ln -sf /etc/nginx/sites-available/kathiravan-portfolio \
            /etc/nginx/sites-enabled/kathiravan-portfolio

# Disable default site if present
sudo rm -f /etc/nginx/sites-enabled/default

# Test and reload
sudo nginx -t
sudo systemctl reload nginx
```

At this point `http://YOUR_DOMAIN.com` should serve the site (still HTTP only).

---

## 5. Add HTTPS with Let's Encrypt (certbot)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d YOUR_DOMAIN.com -d www.YOUR_DOMAIN.com \
             --redirect --agree-tos -m you@example.com --non-interactive
```

Certbot edits the nginx config to add the SSL lines and sets up auto-renewal
(`systemctl list-timers | grep certbot`).

Verify:

```bash
curl -I https://YOUR_DOMAIN.com      # 200 OK
```

---

## 6. Deploying new changes

### Option A — Manual (SSH in and run the script)

On your laptop:

```bash
git push origin main
```

On the VPS:

```bash
cd /var/www/kn && bash deploy.sh
```

`deploy.sh` will fetch, fast-forward, `npm ci`, and `pm2 reload`. Zero downtime.

### Option B — Automatic via GitHub Actions

Add these **Repository Secrets** at
`https://github.com/codewithkathir/kn/settings/secrets/actions`:

| Secret         | Value                                          |
|----------------|------------------------------------------------|
| `VPS_HOST`     | VPS IP or hostname                             |
| `VPS_USER`     | SSH user (e.g. `ubuntu` / `kathir`)            |
| `VPS_SSH_KEY`  | Private key contents (whole `id_ed25519` file) |
| `VPS_PORT`     | SSH port (omit if 22)                          |
| `VPS_APP_DIR`  | `/var/www/kn`                                  |

Generate a deploy key on the VPS:

```bash
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/gh_actions -N ""
cat ~/.ssh/gh_actions.pub >> ~/.ssh/authorized_keys
cat ~/.ssh/gh_actions          # copy this into VPS_SSH_KEY secret
```

Now every push to `main` triggers `.github/workflows/deploy.yml`, which SSHes
into the VPS and runs `deploy.sh`.

### Option C — Polling cron (no GitHub Actions needed)

```bash
crontab -e
# Check for updates every 5 minutes:
*/5 * * * * cd /var/www/kn && bash deploy.sh >> logs/deploy.log 2>&1
```

---

## 7. Useful commands

```bash
pm2 status                    # is the app up?
pm2 logs kn-portfolio         # tail logs
pm2 reload kn-portfolio       # zero-downtime restart
pm2 restart kn-portfolio      # hard restart

sudo nginx -t                 # validate config
sudo systemctl reload nginx   # apply config

sudo journalctl -u nginx -e   # nginx errors
ss -tulpn | grep 9000         # confirm serve is listening
```

---

## 8. Why port 9000 behind nginx?

- nginx terminates TLS, handles gzip, caching, security headers, and HTTP/2.
- Node `serve` only handles static file delivery on `127.0.0.1:9000`
  (not exposed to the internet — firewall blocks it).
- PM2 keeps `serve` alive and restarts it on crash/reboot.
- This pattern lets you later swap `serve` for an Express/Next.js app
  on the same port without touching nginx or DNS.

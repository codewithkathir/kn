# Kathiravan Nambirajan — Personal Brand Website

A premium, production-ready personal brand website for **Kathiravan Nambirajan**, Senior Full Stack Developer.

Built to feel like a funded SaaS company website — not a generic portfolio. Design inspiration:
**Linear · Stripe · Vercel · Framer · Raycast**.

---

## Tech Stack

- **HTML5**
- **Tailwind CSS** (via CDN, for utility classes)
- **Vanilla JavaScript** (no framework dependency)
- **GSAP + ScrollTrigger** (premium animations)
- **AOS** (scroll-reveal)
- **SwiperJS** (tech-stack carousel)
- **Typed.js** (animated typing in hero)
- **Google Fonts** — Space Grotesk (headings), Inter (body), JetBrains Mono (mono)

All third-party libraries are loaded via CDN, so there is **no build step**.

---

## Pages

| Page              | File              | Description                                                 |
| ----------------- | ----------------- | ----------------------------------------------------------- |
| Home              | `index.html`      | Premium hero, animated stats, marquee, featured project, CTAs |
| About             | `about.html`      | Story, philosophy, MVV, timeline, full skill matrix          |
| Projects          | `projects.html`   | Case studies — AI Annotation Tool & Emailer Platform         |
| Experience        | `experience.html` | Animated career timeline + achievements                      |
| Services          | `services.html`   | 8 premium service cards + process + FAQ                      |
| Blog              | `blog.html`       | Featured article, searchable categorized grid, newsletter    |
| Contact           | `contact.html`    | Direct channels + validated project inquiry form             |

---

## Premium Features

- Glassmorphism cards with animated gradient borders
- Dark / light theme toggle (persists in `localStorage`)
- Custom mouse cursor (dot + ring) with hover states
- Mouse-follow glow background
- Animated page loader
- Scroll progress bar
- Animated stat counters (IntersectionObserver-driven)
- Animated skill progress bars
- Floating WhatsApp button
- GitHub-style contribution graph
- Tech-stack carousel (Swiper, infinite scroll)
- Typed.js role rotator in the hero
- GSAP scroll-stagger animations
- AOS scroll reveals throughout
- Magnetic buttons
- Resume download button (PDF lives at `/assets/doc/resume.pdf` and is wired on the Home + Experience pages)
- Particle network in the hero (Canvas)
- Smooth scrolling, sticky navbar, blur effects
- Fully responsive (mobile → desktop)

---

## SEO

- Per-page `<title>` + `<meta description>` + `<meta keywords>`
- Canonical URLs
- Open Graph + Twitter Card meta tags
- Schema.org structured data:
  - `Person` (Home)
  - `AboutPage` (About)
  - `CollectionPage` + `CreativeWork` for projects
  - `Service` (Services)
  - `Blog` + `BlogPosting` (Blog)
  - `ContactPage` (Contact)
- `sitemap.xml`
- `robots.txt`
- Optimized for keywords: *Full Stack Developer Chennai · React.js Developer Chennai · Node.js Developer India · AWS Full Stack Engineer · SaaS Developer Portfolio*

---

## Performance

- All libraries via CDN (HTTP/2, cached)
- Tailwind CDN with utility tree-shaking on demand
- Lazy initialization of heavy effects (particles, GSAP, etc.)
- Prefetched fonts via `preconnect`
- Mobile-first CSS, no layout shift
- Aiming for Lighthouse 95+ in production

---

## Run Locally

The site is fully static — open `index.html` in a browser, or serve it for proper relative paths:

```bash
# Python
python3 -m http.server 8000

# Or with npx
npx serve .
```

Then visit <http://localhost:8000>.

---

## Project Structure

```
kathiravan-portfolio/
├── index.html
├── about.html
├── projects.html
├── experience.html
├── services.html
├── blog.html
├── contact.html
├── robots.txt
├── sitemap.xml
├── README.md
└── assets/
    ├── css/
    │   └── style.css           # Full design system (~30KB)
    ├── js/
    │   ├── partials.js         # Renders nav + footer everywhere
    │   └── main.js             # Cursor, particles, theme, counters, form, GSAP
    ├── doc/
    │   └── resume.pdf           # Wired to "Download Resume" buttons
    └── images/
        └── (og-cover.png, profile photo, etc.)
```

---

## Customization

- **Theme palette** lives in CSS variables at the top of `assets/css/style.css` (`:root` and `[data-theme="light"]`).
- **Nav links** are defined once in `assets/js/partials.js` and rendered on every page. All internal links use the clean, extension-less form (`/about`, `/projects`, `/contact`, …).
- **Resume link** — drop the latest PDF at `/assets/doc/resume.pdf`. The *Download Resume* buttons on `index.html` and `experience.html` already point to it.
- **OG image** — create a 1200x630 social cover at `/assets/images/og-cover.png` and the share previews will pick it up automatically.

### Clean URLs (no `.html`)

The whole site links to clean URLs like `https://kathiravan.dev/about` instead of `…/about.html`. The HTML files themselves still live at the project root (`about.html`, `projects.html`, …) — the Nginx server in front of them does the mapping.

On the VPS, include the snippet at [`deploy/nginx.conf`](./deploy/nginx.conf) inside the `server { … }` block for `kathiravan.dev` (or `include /path/to/deploy/nginx.conf;` it). It does three things:

1. `try_files $uri $uri.html $uri/ =404;` — resolves `/about` to `/about.html` on disk.
2. 301-redirects any legacy `/<page>.html` request to `/<page>` (preserves query strings and SEO).
3. 301-redirects `/index` and `/index.html` to `/`.

After editing the vhost: `sudo nginx -t && sudo systemctl reload nginx`.

---

## Contact

- **Email** — nkathiravan90@gmail.com
- **Phone / WhatsApp** — +91 87541 01216
- **LinkedIn** — [kathiravan-nambirajan](https://www.linkedin.com/in/kathiravan-nambirajan)

© Kathiravan Nambirajan. Built with care.

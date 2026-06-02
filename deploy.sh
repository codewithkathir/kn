#!/usr/bin/env bash
# deploy.sh - run on the VPS to pull latest code and restart the app.
# Usage:   bash deploy.sh
# Cron:    */5 * * * * cd /var/www/kn && bash deploy.sh >> logs/deploy.log 2>&1

set -euo pipefail

APP_NAME="kn-portfolio"
BRANCH="${BRANCH:-main}"

cd "$(dirname "$0")"
mkdir -p logs

echo "==> [$(date -Is)] Deploying $APP_NAME (branch: $BRANCH)"

echo "==> Fetching from origin"
git fetch --all --prune

LOCAL=$(git rev-parse "$BRANCH")
REMOTE=$(git rev-parse "origin/$BRANCH")

if [ "$LOCAL" = "$REMOTE" ]; then
  echo "==> Already up to date ($LOCAL). Nothing to do."
  exit 0
fi

echo "==> Resetting to origin/$BRANCH"
git reset --hard "origin/$BRANCH"

if [ -f package.json ]; then
  echo "==> Installing dependencies"
  npm ci --omit=dev || npm install --omit=dev
fi

echo "==> Restarting PM2 process"
if pm2 describe "$APP_NAME" >/dev/null 2>&1; then
  pm2 reload "$APP_NAME" --update-env
else
  pm2 start ecosystem.config.js
  pm2 save
fi

echo "==> Done. HEAD is now $(git rev-parse --short HEAD)"

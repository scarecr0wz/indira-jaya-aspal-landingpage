#!/usr/bin/env bash

set -Eeuo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEPLOY_TARGET="/home/wahanadata/public_html/indirajayaaspal.biz.id"
SITE_URL="https://indirajayaaspal.biz.id"

if ! command -v npm >/dev/null 2>&1; then
  echo "Error: npm tidak ditemukan." >&2
  exit 1
fi

if ! command -v rsync >/dev/null 2>&1; then
  echo "Error: rsync tidak ditemukan." >&2
  exit 1
fi

if [[ ! -d "$DEPLOY_TARGET" ]]; then
  echo "Error: document root tidak ditemukan: $DEPLOY_TARGET" >&2
  exit 1
fi

cd "$PROJECT_ROOT"

echo "[1/3] Memasang dependency..."
npm ci

echo "[2/3] Membuat production build..."
SITE_URL="$SITE_URL" npm run build

if [[ ! -f "$PROJECT_ROOT/dist/index.html" ]]; then
  echo "Error: hasil build dist/index.html tidak ditemukan." >&2
  exit 1
fi

echo "[3/3] Memasang hasil build ke Apache..."
rsync -a \
  --chown=wahanadata:wahanadata \
  "$PROJECT_ROOT/dist/" \
  "$DEPLOY_TARGET/"

echo "Deployment selesai: $SITE_URL"

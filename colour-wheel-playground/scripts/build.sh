#!/usr/bin/env bash
# Build estático: copia los assets al directorio que sirve Workers.
# Los assets usan rutas RELATIVAS, así funcionan bajo /hueplay/.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

rm -rf dist
mkdir -p dist

cp index.html styles.css color.js index.js dist/

# Social preview (og:image / twitter:image) — 1200x630
if [ -f preview.png ]; then
  cp preview.png dist/preview.png
else
  echo "⚠️  preview.png ausente: og:image quedará roto" >&2
fi

echo "✅ build -> dist/"
ls -1 dist

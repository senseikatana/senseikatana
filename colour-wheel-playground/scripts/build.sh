#!/usr/bin/env bash
# Build estático: copia los assets al directorio que sirve Workers.
# Los assets usan rutas RELATIVAS, así funcionan bajo /showcase/.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

rm -rf dist
mkdir -p dist

cp index.html styles.css index.js dist/

echo "✅ build -> dist/"
ls -1 dist

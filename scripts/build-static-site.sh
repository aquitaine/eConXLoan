#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DIST_DIR="$ROOT_DIR/dist"

rm -rf "$DIST_DIR"
mkdir -p "$DIST_DIR"

cp "$ROOT_DIR/index.html" "$DIST_DIR/index.html"
cp -R "$ROOT_DIR/prototype-loans-admin" "$DIST_DIR/prototype-loans-admin"

# Ensure GitHub Pages serves static files as-is (no Jekyll processing).
touch "$DIST_DIR/.nojekyll"

echo "Built static site into: $DIST_DIR"

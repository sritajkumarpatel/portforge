#!/usr/bin/env bash
set -euo pipefail

DEMO_DIR="${1:-_demo}"
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

if [ -d "$ROOT_DIR/$DEMO_DIR" ]; then
  rm -rf "$ROOT_DIR/$DEMO_DIR"
  echo "Removed ./$DEMO_DIR/"
else
  echo "Nothing to clean — ./$DEMO_DIR/ doesn't exist."
fi

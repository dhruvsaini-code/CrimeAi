#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

echo "1/3 Running backend ASGI test suite..."
PYTHONPATH=. python3 scripts/run_tests.py

echo "2/3 Building frontend production bundle..."
(cd frontend && NODE_OPTIONS="--no-use-system-ca" ./node_modules/.bin/vite build)

echo "3/3 Running frontend verification tests..."
NODE_OPTIONS="--no-use-system-ca" node frontend/tests/frontend.test.mjs

echo "ALL BACKEND & FRONTEND CHECKS PASSED."

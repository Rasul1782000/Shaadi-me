#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$ROOT_DIR/backend"
FRONTEND_DIR="$ROOT_DIR/frontend"
BACKEND_HOST="${BACKEND_HOST:-127.0.0.1}"
BACKEND_PORT="${BACKEND_PORT:-8000}"
FRONTEND_HOST="${FRONTEND_HOST:-127.0.0.1}"
FRONTEND_PORT="${FRONTEND_PORT:-3000}"

require_dir() {
  local dir="$1"
  local message="$2"

  if [[ ! -d "$dir" ]]; then
    echo "$message" >&2
    exit 1
  fi
}

require_file() {
  local file="$1"
  local message="$2"

  if [[ ! -f "$file" ]]; then
    echo "$message" >&2
    exit 1
  fi
}

cleanup() {
  local exit_code=$?

  if [[ -n "${BACKEND_PID:-}" ]]; then
    kill "$BACKEND_PID" 2>/dev/null || true
  fi

  if [[ -n "${FRONTEND_PID:-}" ]]; then
    kill "$FRONTEND_PID" 2>/dev/null || true
  fi

  wait 2>/dev/null || true
  exit "$exit_code"
}

trap cleanup INT TERM EXIT

require_dir "$BACKEND_DIR" "Missing backend directory: $BACKEND_DIR"
require_dir "$FRONTEND_DIR" "Missing frontend directory: $FRONTEND_DIR"
require_file "$BACKEND_DIR/artisan" "Laravel is not set up correctly. Missing: $BACKEND_DIR/artisan"
require_file "$FRONTEND_DIR/package.json" "Angular is not set up correctly. Missing: $FRONTEND_DIR/package.json"

if [[ ! -d "$BACKEND_DIR/vendor" ]]; then
  echo "Missing Laravel dependencies. Run: cd backend && composer install" >&2
  exit 1
fi

if [[ ! -f "$BACKEND_DIR/.env" ]]; then
  echo "Missing backend .env. Run: cd backend && cp .env.example .env && php artisan key:generate" >&2
  exit 1
fi

if [[ ! -d "$FRONTEND_DIR/node_modules" ]]; then
  echo "Missing Angular dependencies. Run: cd frontend && npm install" >&2
  exit 1
fi

echo "Starting Laravel on http://$BACKEND_HOST:$BACKEND_PORT"
(
  cd "$BACKEND_DIR"
  php artisan serve --host="$BACKEND_HOST" --port="$BACKEND_PORT"
) &
BACKEND_PID=$!

echo "Starting Angular on http://$FRONTEND_HOST:$FRONTEND_PORT"
(
  cd "$FRONTEND_DIR"
  npm run start -- --port "$FRONTEND_PORT" --host "$FRONTEND_HOST" --proxy-config proxy.conf.json
) &
FRONTEND_PID=$!

wait -n "$BACKEND_PID" "$FRONTEND_PID"

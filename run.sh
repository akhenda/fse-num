#!/usr/bin/env bash
# run.sh

# Exit on any error
set -e

echo "=== Starting Flask server with Docker Compose ==="
(
  cd server
  docker compose up --build -d
)

echo "=== Building and serving the React app ==="
(
  cd web
  pnpm run build
  pnpm run serve
)

echo "=== All services are up and running! ==="

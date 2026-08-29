#!/usr/bin/env bash
# First publish @manovaspace/* to npmjs.org, then switch Manova consumers from link: to semver.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
TS="$ROOT/manovaspace/ts"

echo "==> Build and publish from manovaspace/ts"
cd "$TS"
bun install --frozen-lockfile
bun run release

echo "==> Switch consumers to published semver pins"
node "$TS/scripts/switch-consumers-to-npm.mjs"

echo "==> Refresh lockfiles (orbit-frontend)"
cd "$ROOT/orbit/orbit-frontend"
bun install

for app in \
  "$ROOT/clients/kaazhe/frontend" \
  "$ROOT/clients/jtash/frontend" \
  "$ROOT/clients/manova/waypoint" \
  "$ROOT/clients/manova/manova-frontend"
do
  echo "==> Refresh lockfiles ($app)"
  (cd "$app" && bun install)
done

echo "Done. Verify: bun --filter @orbit/template build && cd clients/jtash/frontend && bun run build"

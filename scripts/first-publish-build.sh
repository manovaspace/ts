#!/usr/bin/env bash
# First publish of @manovaspace/build (interactive). Run from manovaspace/ts.
set -euo pipefail
cd "$(dirname "$0")/.."
npm whoami --registry=https://registry.npmjs.org
pnpm --filter @manovaspace/build build
pnpm --filter @manovaspace/build publish --access public --no-git-checks
./scripts/configure-trusted-publishing.sh
echo "Verify: npm view @manovaspace/build version"

#!/usr/bin/env bash
# Configure npm trusted publishing (OIDC) for all @manovaspace/* packages.
# Requires: npm 11.5.1+, logged in (npm whoami), 2FA browser approval when prompted.
set -euo pipefail

REGISTRY="${NPM_REGISTRY:-https://registry.npmjs.org}"
REPO="${TRUST_REPO:-manovaspace/ts}"
WORKFLOW="${TRUST_WORKFLOW:-publish.yml}"

for pkg in \
  @manovaspace/tsconfig \
  @manovaspace/markdown \
  @manovaspace/pwa \
  @manovaspace/observability
do
  echo "==> npm trust github $pkg"
  npm trust github "$pkg" \
    --file "$WORKFLOW" \
    --repo "$REPO" \
    --allow-publish \
    --registry="$REGISTRY" \
    -y
done

echo "Done. Verify:"
for pkg in @manovaspace/tsconfig @manovaspace/markdown @manovaspace/pwa @manovaspace/observability; do
  npm trust list "$pkg" --registry="$REGISTRY" 2>/dev/null || true
done

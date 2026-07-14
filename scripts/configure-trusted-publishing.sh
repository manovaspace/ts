#!/usr/bin/env bash
# Configure npm trusted publishing (OIDC) for all @manovaspace/* packages.
# Requires: npm 11.5.1+, logged in (npm whoami), 2FA browser approval when prompted.
#
# Order for NEW package names:
#   1. pnpm build && pnpm release   (first publish — 2FA in terminal)
#   2. ./scripts/configure-trusted-publishing.sh
#   3. CI publish.yml works for later releases
set -euo pipefail

REGISTRY="${NPM_REGISTRY:-https://registry.npmjs.org}"
REPO="${TRUST_REPO:-manovaspace/ts}"
WORKFLOW="${TRUST_WORKFLOW:-publish.yml}"

PACKAGES=(
  @manovaspace/tsconfig
  @manovaspace/markdown
  @manovaspace/pwa
  @manovaspace/observability
)

has_trust() {
  npm trust list "$1" --registry="$REGISTRY" 2>/dev/null | grep -q "type: github"
}

on_npm() {
  npm view "$1" version --registry="$REGISTRY" >/dev/null 2>&1
}

trust_pkg() {
  local pkg="$1"

  if has_trust "$pkg"; then
    echo "==> $pkg: GitHub trusted publisher already configured — skip"
    return 0
  fi

  if ! on_npm "$pkg"; then
    echo "==> $pkg: not on npm yet — publish first (pnpm build && pnpm release), then re-run this script"
    return 0
  fi

  echo "==> npm trust github $pkg"
  if npm trust github "$pkg" \
    --file "$WORKFLOW" \
    --repo "$REPO" \
    --allow-publish \
    --registry="$REGISTRY" \
    -y; then
    return 0
  fi

  local code=$?
  if [[ "$code" -eq 409 ]] || npm trust list "$pkg" --registry="$REGISTRY" 2>/dev/null | grep -q "type: github"; then
    echo "==> $pkg: trust already exists (409) — skip"
    return 0
  fi

  echo "==> $pkg: npm trust failed (exit $code)" >&2
  return "$code"
}

failed=0
for pkg in "${PACKAGES[@]}"; do
  trust_pkg "$pkg" || failed=1
done

echo ""
echo "Verify:"
for pkg in "${PACKAGES[@]}"; do
  if on_npm "$pkg"; then
    if has_trust "$pkg"; then
      echo "  OK  $pkg (on npm + trusted)"
    else
      echo "  !!  $pkg (on npm, no trust — re-run after 2FA)"
      failed=1
    fi
  else
    echo "  --  $pkg (not on npm — publish first)"
  fi
done

exit "$failed"

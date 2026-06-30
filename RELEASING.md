# Releasing

How `@manovaspace/*` packages are versioned and published to [registry.npmjs.org](https://www.npmjs.org).

## Versioning policy

- **Independent semver** per package (Changesets default). `@manovaspace/pwa` at `1.2.0` and `@manovaspace/tsconfig` at `0.1.3` is normal.
- **Patch** — bugfix, internal refactor, docs-only in published files
- **Minor** — backward-compatible API addition
- **Major** — breaking change (rename export, drop Node/Next support, etc.)

### Version lockstep — when to use it

**Default: independent versions** (current config). Each package releases when it changes. Best for unrelated utilities (`tsconfig` vs `pwa`).

**Optional lockstep** — add a `fixed` group in `.changeset/config.json` only if two packages always ship together (e.g. future `pwa` + `pwa-sw` split). Orbit.js used lockstep across 15+ packages; you have four loosely coupled libs — **don't lockstep unless consumers always upgrade them as a set**.

```json
"fixed": [["@manovaspace/pwa", "@manovaspace/observability"]]
```

Only add this if you document why. Otherwise independent is simpler for consumers and changelog clarity.

### Changelog / version history

Changesets appends to each package's `CHANGELOG.md` on `pnpm version-packages`. You do **not** need a long npm version history on purpose — quality over quantity. A few meaningful semver releases beat dozens of empty patches.

## Routine release (maintainers)

### 1. Merge PRs with changesets

Every npm-facing change should include `pnpm changeset` output in `.changeset/`.

### 2. Version

```bash
cd manovaspace/ts
pnpm version-packages    # bumps package.json + CHANGELOG.md
git add -A
git commit -m "chore: version packages"
git push origin main
```

### 3. Publish (automatic)

CI publishes when a `chore: version packages` commit lands on `main` (see `.github/workflows/publish.yml`).

Manual fallback:

```bash
pnpm build
pnpm release             # or: npm publish in each package directory
```

**npm 2FA:** Account uses `auth-and-writes`. Local publish opens a browser approval URL — complete it in the terminal session.

### 4. Manova workspace consumers

After packages exist on npm:

```bash
node scripts/switch-consumers-to-npm.mjs
# then pnpm install in orbit-frontend + affected client apps
```

For local co-development before publish, revert with `scripts/switch-consumers-to-link.mjs`.

## First publish (one-time)

1. Create npm org [**manovaspace**](https://www.npmjs.com/org/manovaspace)
2. Prefer **`pnpm release`** from the monorepo root — resolves `catalog:` and `workspace:*` before publish. Raw `npm publish` per package works only if `dependencies` / `peerDependencies` use real semver ranges (not `catalog:`).

3. Configure [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/) per package (GitHub org `manovaspace`, repo `ts`, workflow `publish.yml`) — avoids long-lived `NPM_TOKEN`

   **New package names** (`tokens`, `ui`, `devtools`, …): npm requires a **first publish with 2FA** before `npm trust github` works. Order:

   ```bash
   pnpm build && pnpm release          # browser 2FA — creates the package on npmjs.org
   ./scripts/configure-trusted-publishing.sh   # then OIDC per package
   ```

   Re-running the trust script is safe: it skips packages already configured (409) and packages not yet on npm.

4. Optional: `gh secret set NPM_TOKEN --repo manovaspace/ts` as fallback

## CI authentication

**Trusted publishing (OIDC)** — workflow has `id-token: write`. Do not set `NODE_AUTH_TOKEN` in CI when OIDC is configured.

Configure once in your terminal (2FA browser prompt):

```bash
chmod +x scripts/configure-trusted-publishing.sh
./scripts/configure-trusted-publishing.sh
```

Verify: `npm trust list @manovaspace/tsconfig`

Optional **fallback:** add repo secret `NPM_TOKEN` and pass `NODE_AUTH_TOKEN` in the workflow only if OIDC is unavailable.

## GitHub Release (optional)

Creating a GitHub Release also triggers publish. Useful for tagging milestones; day-to-day releases only need the version commit.

## Checklist

- [ ] Changeset committed in PR
- [ ] `pnpm version-packages` on main
- [ ] `chore: version packages` pushed
- [ ] CI publish green
- [ ] `npm view @manovaspace/<pkg> version` matches
- [ ] Manova consumers updated if needed

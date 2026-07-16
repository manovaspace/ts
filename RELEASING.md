# Releasing

How `@manovaspace/*` packages in this repository are versioned and published to [npmjs.org](https://www.npmjs.com).

## Versioning policy

- **Independent semver** per package (Changesets default). Different packages may sit at different versions.
- **Patch** — bug fixes, internal refactors, documentation in published files
- **Minor** — backward-compatible API additions
- **Major** — breaking changes (renamed exports, dropped runtime support, and similar)

### Optional lockstep

Default remains independent versions. Add a `fixed` group in `.changeset/config.json` only when two or more packages must always release together:

```json
"fixed": [["@manovaspace/pwa", "@manovaspace/observability"]]
```

Document the reason in the pull request if you enable lockstep. Otherwise prefer independent versions for clearer changelogs.

### Changelogs

`pnpm version-packages` updates each package’s `CHANGELOG.md`. Prefer meaningful releases over frequent empty patches.

## Routine release

### 1. Merge pull requests that include changesets

Every publishable change should include output from `pnpm changeset` under `.changeset/`.

### 2. Version on `main`

```bash
pnpm version-packages
git add -A
git commit -m "chore: version packages"
git push origin main
```

### 3. Publish

CI publishes when a `chore: version packages` commit lands on `main` (see `.github/workflows/publish.yml`).

Manual fallback:

```bash
pnpm build
pnpm release
```

npm accounts with `auth-and-writes` may prompt for browser confirmation during a local publish.

## First publish of a new package

1. Prefer **`pnpm release`** from the monorepo root so `catalog:` and `workspace:*` ranges resolve before publish.
2. Configure [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/) for the package (GitHub org `manovaspace`, repo `ts`, workflow `publish.yml`).

New package names require a **first local publish with 2FA** before trusted publishing can be attached:

```bash
pnpm build && pnpm release
./scripts/configure-trusted-publishing.sh
```

Re-running the trust script is safe: it skips packages already configured and packages not yet on npm.

Optional fallback: repository secret `NPM_TOKEN` for CI when OIDC is unavailable.

## CI authentication

Trusted publishing uses OIDC (`id-token: write` on the workflow). Do not set `NODE_AUTH_TOKEN` in CI when OIDC is configured.

```bash
./scripts/configure-trusted-publishing.sh
npm trust list @manovaspace/tsconfig
```

## GitHub Releases

Creating a GitHub Release can also trigger publish. Day-to-day releases only need the version commit on `main`.

## Checklist

- [ ] Changeset included in the pull request
- [ ] `pnpm version-packages` run on `main`
- [ ] `chore: version packages` pushed
- [ ] CI publish succeeded
- [ ] `npm view @manovaspace/<package> version` matches the release

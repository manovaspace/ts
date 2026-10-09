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

`bun run version-packages` updates each package’s `CHANGELOG.md`. Prefer meaningful releases over frequent empty patches.

## Routine release

### 1. Merge pull requests that include changesets

Every publishable change should include output from `bun run changeset` under `.changeset/`.

### 2. Open a version PR

Start a topic branch from the updated `main` after the package PRs merge:

```bash
git switch -c chore/version-packages
bun install --frozen-lockfile
bun run version-packages
```

Review each affected package version, dependency range, generated changelog and
lockfile. Stage only the reviewed release files, commit with
`chore: version packages`, push the topic branch and open a PR. After CI passes,
squash merge with the exact title `chore: version packages` and verify the merged
head subject. Direct pushes to `main` are forbidden. If the intended versions
have already been calculated and merged, verify that state before publishing;
do not calculate a second bump.

### 3. Publish

[`.github/workflows/publish.yml`](./.github/workflows/publish.yml) publishes on a
`main` push whose head message contains literal `chore: version packages`, a
published GitHub Release, or a maintainer-selected `workflow_dispatch`.
`chore(release): version packages` does not satisfy the main-push condition.
The workflow builds and publishes existing manifest versions; it does not run
`changeset version`. Release/dispatch and local fallback must use a reviewed,
already-versioned commit and the complete intended unpublished package set.
Publishing changes npm; it does not deploy consumers.

Manual fallback:

```bash
bun run build
bun run release
```

npm accounts with `auth-and-writes` may prompt for browser confirmation during a local publish.

## First publish of a new package

1. Prefer **`bun run release`** from the monorepo root so `catalog:` and `workspace:*` ranges resolve before publish.
2. Configure [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/) for the package (GitHub org `manovaspace`, repo `ts`, workflow `publish.yml`).

New package names cannot be created by OIDC alone. Use one of:

**A. Local first publish (interactive 2FA)**

```bash
npm login --registry=https://registry.npmjs.org
bun run build && bun run release
./scripts/configure-trusted-publishing.sh
```

**B. Automation token (CI)**

1. Create an npm classic/granular token with publish rights on `@manovaspace/*`.
2. `gh secret set NPM_TOKEN --repo manovaspace/ts`
3. Merge the reviewed version PR with head subject `chore: version packages` (or dispatch Publish at an already-versioned reviewed commit). `NODE_AUTH_TOKEN` is wired in `publish.yml` for this case.
4. `./scripts/configure-trusted-publishing.sh` then remove `NPM_TOKEN` if you prefer OIDC-only afterwards.

Re-running the trust script is safe: it skips packages already configured and packages not yet on npm.

## CI authentication

Trusted publishing uses OIDC (`id-token: write` on the workflow). Do not set `NODE_AUTH_TOKEN` in CI when OIDC is configured. CI sets `NPM_CONFIG_PROVENANCE=true` so publishes include npm provenance attestations.

```bash
./scripts/configure-trusted-publishing.sh
npm trust list @manovaspace/tsconfig
```

## GitHub Releases

Creating a GitHub Release can also trigger publish. Day-to-day releases only need the version commit on `main`.

## Checklist

- [ ] Changeset included in the pull request
- [ ] Versions/changelogs calculated once and reviewed on a topic branch
- [ ] Version PR passed CI and merged with head subject `chore: version packages`
- [ ] CI publish succeeded
- [ ] `npm view @manovaspace/<package> version` matches the release

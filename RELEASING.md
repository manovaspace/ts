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

`bun run version-packages` updates package versions and `CHANGELOG.md` files, then runs `bun install --lockfile-only` to regenerate `bun.lock` for the new workspace versions. Prefer meaningful releases over frequent empty patches.

## Routine release

**Automation status:** The release-PR workflow is a pilot on an unmerged branch. Keep its status Planned until it is merged to the repository's default branch, a scoped `RELEASE_TOKEN` is available, generated version-PR checks run unattended, and branch protection requires review and the normal CI checks. Record hosted evidence before marking the automation Active.

### 1. Merge pull requests that include changesets

Every publishable change should include output from `bun run changeset` under `.changeset/`.

### 2. Review the version PR

When changeset-bearing PRs reach `main`, the publish workflow creates or updates one `chore: version packages` PR for the combined pending changesets. It runs `bun run version-packages` to calculate versions, update changelogs, and regenerate `bun.lock` with `bun install --lockfile-only`. Review the affected package versions, dependency ranges, generated changelogs and lockfile in that PR. The version PR remains the review gate; the workflow does not publish while changesets are pending.

Merge the reviewed version PR after its required checks pass, using the exact title `chore: version packages` and squash merge so the main commit subject is also `chore: version packages`. Do not push version changes directly to `main`.

### 3. Configure the release PR token

Make an Actions secret named `RELEASE_TOKEN` available to this repository before enabling unattended releases. Use a dedicated fine-grained personal access token limited to `manovaspace/ts` with **Contents: read and write** and **Pull requests: read and write**. The workflow fails with an explicit error if this secret is unavailable; it does not fall back to `GITHUB_TOKEN`.

GitHub Actions events created with `GITHUB_TOKEN` can leave pull request checks in an approval-required state, so they are unsuitable when required checks must run unattended. `RELEASE_TOKEN` makes the version PR open/update events run checks as the token owner. Keep the workflow's `GITHUB_TOKEN` permissions read-only for repository contents; npm publishing uses OIDC and provenance instead.

### 4. Publish after merge

After the version PR merges to `main`, the same workflow builds and publishes the already-reviewed manifest versions with `bun run release`. The workflow runs only on pushes to `main`; it has no GitHub Release or manual dispatch publish trigger, and it invokes `bun run release` only when the pushed commit subject is exactly `chore: version packages`. It does not calculate another version bump. Use that exact squash-merge title and let the workflow complete before starting another release.
Publishing changes npm; it does not deploy consumers.

Manual fallback:

Use this only to recover a failed publish after the reviewed version PR has
merged and passed its required checks. It must not bypass the version PR review
or calculate a second version. Publishing is an external release action; get
maintainer approval for the specific publish before running the command.

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
3. Set up `RELEASE_TOKEN` as described above so the workflow can create/update the reviewed version PR and its checks can run.
4. Merge the reviewed version PR with head subject `chore: version packages`. `NODE_AUTH_TOKEN` is wired in `publish.yml` for this first-publish case.
5. `./scripts/configure-trusted-publishing.sh` then remove `NPM_TOKEN` if you prefer OIDC-only afterwards.

Re-running the trust script is safe: it skips packages already configured and packages not yet on npm.

## CI authentication

Trusted publishing uses OIDC (`id-token: write` on the workflow). Do not set `NODE_AUTH_TOKEN` in CI when OIDC is configured. CI sets `NPM_CONFIG_PROVENANCE=true` so publishes include npm provenance attestations.

```bash
./scripts/configure-trusted-publishing.sh
npm trust list @manovaspace/tsconfig
```

## GitHub Releases

Creating a GitHub Release does not trigger npm publishing. The workflow publishes only when a `main` push has no remaining changesets and its commit subject is exactly `chore: version packages`.

## Checklist

- [ ] Changeset included in the pull request
- [ ] Versions/changelogs calculated once and reviewed on a topic branch
- [ ] Version PR passed CI and merged with head subject `chore: version packages`
- [ ] CI publish succeeded
- [ ] `npm view @manovaspace/<package> version` matches the release

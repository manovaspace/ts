---
see_also:
  - handbook/docs/orbit/decisions/067-licensing.md
  - handbook/docs/orbit/guides/open-commons.md
---

# manovaspace/ts — Agent Guide

MIT open-commons monorepo. Packages publish to `registry.npmjs.org` as `@manovaspace/*`.

## Commands

```bash
bun run build
bun run test
bun run typecheck
bun run changeset          # required in PRs that ship to npm
bun run version-packages   # maintainers only
```

## Releasing

Read [RELEASING.md](./RELEASING.md) for the actual Changesets authority and
topic-branch/version-PR workflow. The publish trigger depends on the merged
`chore: version packages` subject; direct-main pushes are forbidden. Public setup
and checks require no proprietary repository, private handbook or staff MCP.

## Rules

- No `@orbit/*` imports — decouple from proprietary Orbit toolkit
- No `Orbit` prefix in public export names
- Each package versions **independently** via Changesets (no lockstep unless `fixed` group added with reason)

## UI

Before writing UI, read `packages/versioning/node_modules/@manovaspace/ui/dist/agents/index.md`.

## Future triggers (agents)

Use repository-local [FUTURE-TRIGGERS.md](./FUTURE-TRIGGERS.md) as the
standalone public agent authority. Staff working in Manova may additionally
consult the workspace root overlay when available; it is not a public setup or
check prerequisite. Notify the user when a trigger fires; remind only unless asked.

<!-- manova:conventions v1 — generated from manovaspace/ci conventions/core.md; edit it there -->
## Shared conventions

These rules apply to every Manova repository. They are copied from `manovaspace/ci` (`conventions/core.md`); change them there, not here.

### Delivery

1. Never push to `main`. Every change goes on a topic branch (`feat/<name>`, `fix/<name>`, `refactor/<name>`, `docs/<name>`, `chore/<name>`) and reaches `main` through a pull request.
2. One pull request does one thing. An unrelated problem you find on the way becomes an issue, not part of this change.
3. Pull request titles and commit messages follow Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`, `chore:`, `test:`; `!` for a breaking change). Releases are computed from them.
4. Merge with squash once the checks are green. Do not use `--no-verify`; if you ever must, say so in the pull request.

### Checks

5. CI runs `manovaspace/ci@v1`. Run the same gate locally before you push; a red check is fixed, not skipped.
6. Tool versions (Go, Node, Bun, linters) come from `ci/versions.env` in `manovaspace/ci`. Do not pin a different version in this repository.
7. A behaviour change comes with a test that fails without it. Do not delete or weaken a test to make a change pass.

### Secrets

8. Never commit a secret, token, password, private key or `.env` file. Commit `.env.example` with placeholders instead.
9. Never print a secret in logs, test output, error messages or pull requests. Read secrets from the environment or a file at run time.

### Runtime

10. Containers talk to each other by name on a Docker network. Do not publish a port on the host unless a person or a host process needs it, and then bind `127.0.0.1`, never `0.0.0.0`.
11. Configuration comes from the environment. A service with a missing required setting refuses to start; it never falls back to a built-in secret or a development default in production.
12. Port numbers come from the workspace port registry. Do not invent a port.

### Documentation

13. This repository explains itself: `README.md` says how to set up, run, test and deploy it; `AGENTS.md` holds its binding rules; repository decisions live in `docs/decisions/`.
14. Write plain, short sentences. Keep exact names, paths, commands and versions. Do not document what the code already says.
<!-- /manova:conventions -->

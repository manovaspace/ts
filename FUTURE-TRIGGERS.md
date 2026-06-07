# Future triggers

**Agents: mandatory read** when the task touches `manovaspace/`, `@manovaspace/*`, open commons, or extracting a new public package.

## Agent obligation

1. Read every row in the trigger table below.
2. Evaluate **trigger when** against the **current** repo state (count packages, grep configs, check npm, etc.).
3. If **any** row matches, open your response with a **Future triggers fired** section listing `ID`, title, and recommended next step.
4. **Remind only** — do not implement unless the user explicitly asks.
5. If the user completes an item, they will update **status** here (or ask you to).

## Trigger table

| ID | Title | Deferred (why not now) | Trigger when (evaluate all) | Then do | Status |
| --- | --- | --- | --- | --- | --- |
| FT-001 | `@manovaspace/build` shared tooling | 3 small `tsup` configs; turbo root is enough | **≥5** publishable packages **OR** same `tsup`/build config duplicated in **≥3** packages **OR** shared codegen across packages | Add `packages/build/` (or `internal/build-config`) exporting shared `tsup`/`tsup.config` baseline; document in README | deferred |
| FT-002 | Changesets **lockstep** group | Packages are independent; consumers pick one | User ships **split packages that must version together** (e.g. `pwa` + `pwa-cli`) **OR** repeated support burden from version skew | Add `fixed` group in `.changeset/config.json`; document in `RELEASING.md` | deferred |
| FT-003 | npm **trusted publishing** (OIDC) | First publish not done; needs per-package npm setup | **All** packages on npm **AND** maintainer has npm org access **AND** no `NPM_TOKEN` secret yet | Configure trusted publisher per package (org `manovaspace`, repo `ts`, workflow `publish.yml`); remove token fallback when verified | deferred |
| FT-004 | **GitHub Pages** docs site | READMEs sufficient for 4 packages | User wants public docs site **OR** **≥6** packages **OR** external adopters asking for API docs **OR** cross-package guides exceed README comfort | See [docs/DOCUMENTATION-SITE.md](./docs/DOCUMENTATION-SITE.md); implement recommended option | **planned** |
| FT-005 | **`manovaspace/go`** repo | TS monorepo not fully shipped | Go extraction approved in ADR-017 inventory **AND** candidate package passes extraction gate | New repo `github.com/manovaspace/go`; mirror `ts` release patterns | deferred |
| FT-006 | Consumer **semver** pins (Manova) | npm publish blocked / 404 | `npm view @manovaspace/tsconfig version` succeeds **AND** Manova consumers still use `link:` | Run `scripts/switch-consumers-to-npm.mjs`; `pnpm install` in affected apps | deferred |
| FT-007 | **SECURITY.md** + security policy | Small MIT tooling; low attack surface | Package handles auth/secrets/user PII **OR** **≥1000** weekly npm downloads **OR** external security report | Add `SECURITY.md`, npm security policy URL | deferred |
| FT-008 | **Changesets action** (Version PR bot) | Manual `version-packages` matches orbit-frontend habit | **≥3** concurrent external contributors **OR** missed version commits become painful | Add `changesets/action` workflow for automated Version Packages PRs | deferred |

## How to add a trigger

Copy a row. Use:

- **ID** — `FT-NNN`
- **Title** — short name
- **Deferred** — why YAGNI today
- **Trigger when** — objective, countable conditions (not vibes)
- **Then do** — concrete deliverable
- **Status** — `deferred` \| `planned` \| `done` \| `cancelled`

## Related

- [RELEASING.md](./RELEASING.md) — ship workflow
- [docs/DOCUMENTATION-SITE.md](./docs/DOCUMENTATION-SITE.md) — GitHub Pages options (FT-004)
- [CONTRIBUTING.md](./CONTRIBUTING.md)

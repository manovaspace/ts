# manovaspace/ts — Agent Guide

MIT open-commons monorepo. Packages publish to `registry.npmjs.org` as `@manovaspace/*`.

## Commands

```bash
pnpm build
pnpm test
pnpm typecheck
pnpm changeset          # required in PRs that ship to npm
pnpm version-packages   # maintainers only
```

## Releasing

Read [RELEASING.md](./RELEASING.md). Flow matches proprietary `orbit-frontend`: changeset in PR → `chore: version packages` on main → CI publish.

## Rules

- No `@orbit/*` imports — decouple from proprietary Orbit toolkit
- No `Orbit` prefix in public export names
- Each package versions **independently** via Changesets (no lockstep unless `fixed` group added with reason)

## Future triggers (agents)

**Before planning or implementing**, read [FUTURE-TRIGGERS.md](./FUTURE-TRIGGERS.md). If any trigger condition matches the current repo, notify the user in a **Future triggers fired** section. Remind only — do not build unless asked.

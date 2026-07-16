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

Read workspace root [`FUTURE-TRIGGERS.md`](../../FUTURE-TRIGGERS.md) (Manova folder — canonical). Public stub: [FUTURE-TRIGGERS.md](./FUTURE-TRIGGERS.md). Notify user when triggers fire; remind only unless asked.

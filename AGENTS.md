# manovaspace/ts — Agent Guide

MIT open-commons monorepo. Packages publish to `registry.npmjs.org` as `@manovaspace/*`.

## Commands

```bash
pnpm build
pnpm test
pnpm typecheck
pnpm changeset
```

## Rules

- No `@orbit/*` imports — decouple from proprietary Orbit toolkit
- No `Orbit` prefix in public export names
- Each package under `packages/` versions independently via Changesets

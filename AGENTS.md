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

## Future triggers (agents)

Use repository-local [FUTURE-TRIGGERS.md](./FUTURE-TRIGGERS.md) as the
standalone public agent authority. Staff working in Manova may additionally
consult the workspace root overlay when available; it is not a public setup or
check prerequisite. Notify the user when a trigger fires; remind only unless asked.

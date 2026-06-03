# manovaspace/ts

MIT TypeScript open-commons monorepo. Published to npm as `@manovaspace/*`.

## Packages

| Package | Description |
| --- | --- |
| `@manovaspace/tsconfig` | Shared TypeScript compiler presets |
| `@manovaspace/markdown` | GFM markdown renderer for React |
| `@manovaspace/pwa` | Next.js PWA helpers (Serwist) |
| `@manovaspace/observability` | Next.js Sentry instrumentation glue |

## Commands

```bash
pnpm install
pnpm build
pnpm test
pnpm typecheck
pnpm changeset    # before release
pnpm release      # build + publish to npmjs.org
```

## Local development (Manova workspace)

Link from sibling repos:

```json
"@manovaspace/tsconfig": "link:../../../manovaspace/ts/packages/tsconfig"
```

## License

MIT — see [LICENSE](LICENSE).

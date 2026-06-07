# manovaspace/ts

[![CI](https://github.com/manovaspace/ts/actions/workflows/ci.yml/badge.svg)](https://github.com/manovaspace/ts/actions/workflows/ci.yml)

MIT TypeScript open commons. Published on npm as [`@manovaspace/*`](https://www.npmjs.com/org/manovaspace).

Generic libraries extracted from proprietary Orbit tooling — reusable without the `@orbit` platform.

## Packages

| npm | Description |
| --- | --- |
| [`@manovaspace/tsconfig`](https://www.npmjs.com/package/@manovaspace/tsconfig) | Strict shared TypeScript presets for Next.js apps and React libraries |
| [`@manovaspace/markdown`](https://www.npmjs.com/package/@manovaspace/markdown) | Lightweight GFM markdown renderer for React and Next.js |
| [`@manovaspace/pwa`](https://www.npmjs.com/package/@manovaspace/pwa) | Serwist and web app manifest helpers for Next.js PWAs |
| [`@manovaspace/observability`](https://www.npmjs.com/package/@manovaspace/observability) | Next.js instrumentation helpers for Sentry and optional OpenTelemetry |

## Development

```bash
pnpm install
pnpm build
pnpm test
pnpm typecheck
```

## Releasing

See [RELEASING.md](./RELEASING.md). Summary: `pnpm changeset` in PRs → `pnpm version-packages` on main → CI publishes.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## Local development (Manova workspace)

Sibling repos can use `link:` until semver pins are on npm:

```json
"@manovaspace/pwa": "link:../../../manovaspace/ts/packages/pwa"
```

Scripts: `scripts/ensure-build.mjs`, `scripts/switch-consumers-to-npm.mjs`, `scripts/switch-consumers-to-link.mjs`.

## License

MIT — see [LICENSE](./LICENSE).

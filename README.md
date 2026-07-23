# manovaspace/ts

[![CI](https://github.com/manovaspace/ts/actions/workflows/ci.yml/badge.svg)](https://github.com/manovaspace/ts/actions/workflows/ci.yml)

Shared TypeScript utilities for Next.js and React applications. Published on npm under [`@manovaspace/*`](https://www.npmjs.com/org/manovaspace).

**Documentation:** [manovaspace.github.io/docs/utilities](https://manovaspace.github.io/docs/utilities/)

## Packages

| Package | Description | Docs |
| --- | --- | --- |
| [`@manovaspace/tsconfig`](https://www.npmjs.com/package/@manovaspace/tsconfig) | Strict TypeScript presets for apps and libraries | [docs](https://manovaspace.github.io/docs/utilities/packages/tsconfig/) |
| [`@manovaspace/markdown`](https://www.npmjs.com/package/@manovaspace/markdown) | Lightweight GFM renderer for React | [docs](https://manovaspace.github.io/docs/utilities/packages/markdown/) |
| [`@manovaspace/pwa`](https://www.npmjs.com/package/@manovaspace/pwa) | Serwist and web app manifest helpers for Next.js | [docs](https://manovaspace.github.io/docs/utilities/packages/pwa/) |
| [`@manovaspace/observability`](https://www.npmjs.com/package/@manovaspace/observability) | Next.js instrumentation helpers for Sentry | [docs](https://manovaspace.github.io/docs/utilities/packages/observability/) |

Related: design tokens and UI components live in [manovaspace/design-system](https://github.com/manovaspace/design-system).

## Requirements

- Node.js 24 or newer (for developing this monorepo)
- pnpm (recommended; npm and yarn also work for installing published packages)

## Development

```bash
pnpm install
pnpm build
pnpm test
pnpm typecheck
pnpm lint
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for pull requests and [RELEASING.md](./RELEASING.md) for versioning and publish.

## License

[MIT](./LICENSE)

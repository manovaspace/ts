# @manovaspace/tsconfig

Strict shared TypeScript presets for Next.js apps and React libraries.

Part of [manovaspace/ts](https://github.com/manovaspace/ts) — MIT open commons.

## Install

```bash
pnpm add -D @manovaspace/tsconfig
```

## Usage

**Next.js app**

```json
{
  "extends": "@manovaspace/tsconfig/nextjs.json",
  "include": ["**/*.ts", "**/*.tsx", "next-env.d.ts"],
  "exclude": ["node_modules"]
}
```

**React library**

```json
{
  "extends": "@manovaspace/tsconfig/react-library.json",
  "include": ["src"]
}
```

## Presets

| File | Purpose |
| --- | --- |
| `base.json` | Strict ES2022 defaults |
| `nextjs.json` | Next.js App Router apps |
| `react-library.json` | React packages (`jsx: react-jsx`) |

## Related packages

| Package | Use when |
| --- | --- |
| [`@manovaspace/markdown`](https://www.npmjs.com/package/@manovaspace/markdown) | GFM blog/docs in React |
| [`@manovaspace/pwa`](https://www.npmjs.com/package/@manovaspace/pwa) | Next.js PWA / Serwist |
| [`@manovaspace/observability`](https://www.npmjs.com/package/@manovaspace/observability) | Next.js Sentry instrumentation |

## Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) and [RELEASING.md](../../RELEASING.md) in the monorepo root.

## License

MIT — see [LICENSE](../../LICENSE).

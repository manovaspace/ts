# @manovaspace/tsconfig

Shared TypeScript compiler presets for Manova [open commons](https://github.com/manovaspace).

Extracted from Orbit `orbit-frontend`; Orbit UI packages remain proprietary under `@orbit/*`.

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

**React library package**

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
| `react-library.json` | React packages (jsx react-jsx) |

## Local development (Manova workspace)

For co-development before a release lands on npm, use `link:` (see [open commons](/guides/open-commons)):

```json
"@manovaspace/tsconfig": "link:../../../manovaspace/ts/packages/tsconfig"
```

## Publish

```bash
npm publish --access public
```

CI publishes on GitHub Release (see `.github/workflows/publish.yml`). Requires `NPM_TOKEN` with access to the `@manovaspace` npm org.

## License

MIT

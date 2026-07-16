# @manovaspace/markdown

Lightweight GFM markdown renderer for React and Next.js.

Part of [manovaspace/ts](https://github.com/manovaspace/ts) — MIT open commons.

Renders GitHub-flavored markdown with sensible typography classes (`text-foreground`, `text-muted-foreground`, tables, code). Bring your own design tokens or Tailwind theme — no CSS bundle shipped.

## Install

```bash
pnpm add @manovaspace/markdown
```

Peer dependencies: `react`, `react-dom`.

## Usage

```tsx
import { MarkdownContent } from "@manovaspace/markdown";

export function BlogPost({ source }: { source: string }) {
  return <MarkdownContent>{source}</MarkdownContent>;
}
```

Works in Server and Client Components — the component is a thin wrapper around `react-markdown` + `remark-gfm`.

## API

| Export | Description |
| --- | --- |
| `MarkdownContent` | Renders markdown string children with GFM + styled elements |
| `MarkdownContentProps` | `children: string` |

## Related packages

| Package | Use when |
| --- | --- |
| [`@manovaspace/tsconfig`](https://www.npmjs.com/package/@manovaspace/tsconfig) | Shared TypeScript presets |
| [`@manovaspace/pwa`](https://www.npmjs.com/package/@manovaspace/pwa) | Offline / installable Next.js apps |
| [`@manovaspace/observability`](https://www.npmjs.com/package/@manovaspace/observability) | Sentry instrumentation for Next.js |

## Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) and [RELEASING.md](../../RELEASING.md) in the monorepo root.

## License

MIT — see [LICENSE](../../LICENSE).

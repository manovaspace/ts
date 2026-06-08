# @manovaspace/pwa

Serwist and web app manifest helpers for Next.js progressive web apps.

Part of [manovaspace/ts](https://github.com/manovaspace/ts) — MIT open commons.

Covers manifest metadata, theme colors, Serwist service-worker wiring, and a production-only `SerwistShell` provider. Framework-agnostic color types — pass your own light/dark palette instead of coupling to a design-system package.

## Install

```bash
pnpm add @manovaspace/pwa
```

Peer dependencies: `next`, `react`, `react-dom`.

## Quick start

**`next.config.ts`**

```ts
import { withSerwist } from "@manovaspace/pwa/next";
import type { NextConfig } from "next";

export default withSerwist({
  transpilePackages: ["@manovaspace/pwa"],
});
```

**`app/manifest.ts`**

```ts
import { defineWebAppManifest } from "@manovaspace/pwa";

export default defineWebAppManifest({
  name: "My App",
  shortName: "App",
  startUrl: "/",
  themeColors: { light: "#ffffff", dark: "#0a0a0a" },
});
```

**`app/layout.tsx`**

```tsx
import { SerwistShell } from "@manovaspace/pwa/react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SerwistShell>{children}</SerwistShell>
      </body>
    </html>
  );
}
```

## Subpath exports

| Import | Purpose |
| --- | --- |
| `@manovaspace/pwa` | Manifest + metadata helpers, color types |
| `@manovaspace/pwa/next` | `withSerwist` Next.js config wrapper |
| `@manovaspace/pwa/react` | `SerwistShell` client provider |
| `@manovaspace/pwa/sw` | Default service worker entry |

## Related packages

| Package | Use when |
| --- | --- |
| [`@manovaspace/tsconfig`](https://www.npmjs.com/package/@manovaspace/tsconfig) | Shared TypeScript presets |
| [`@manovaspace/markdown`](https://www.npmjs.com/package/@manovaspace/markdown) | Markdown content pages |
| [`@manovaspace/observability`](https://www.npmjs.com/package/@manovaspace/observability) | Error reporting alongside PWA shell |

## Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) and [RELEASING.md](../../RELEASING.md) in the monorepo root.

## License

MIT — see [LICENSE](../../LICENSE).

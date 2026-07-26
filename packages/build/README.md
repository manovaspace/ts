# @manovaspace/build

Shared [tsup](https://tsup.egoist.dev/) config helpers for `@manovaspace/*` packages.

## Install

```bash
pnpm add -D @manovaspace/build tsup
```

## Usage

**Plain ESM library**

```ts
import { defineLibraryConfig } from "@manovaspace/build";

export default defineLibraryConfig({
  entry: ["src/index.ts"],
});
```

**React library** (React marked external)

```ts
import { defineReactLibraryConfig } from "@manovaspace/build";

export default defineReactLibraryConfig({
  entry: ["src/index.ts"],
  external: ["react-markdown", "remark-gfm"],
});
```

**Unbundled components** (preserves file structure)

```ts
import { defineUnbundledConfig } from "@manovaspace/build";

export default defineUnbundledConfig({
  entry: ["src/index.ts", "src/**/*.tsx", "!src/**/*.test.tsx"],
  external: ["@manovaspace/tokens", "radix-ui"],
});
```

## Notes

- Defaults: `format: ["esm"]`, `dts`, `sourcemap`, `clean` unless `--watch`.
- Extra CSS pipelines (e.g. token codegen) stay in package scripts — not in this package.
- License: MIT

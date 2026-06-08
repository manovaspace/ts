# @manovaspace/observability

Next.js instrumentation helpers for Sentry and optional OpenTelemetry.

Part of [manovaspace/ts](https://github.com/manovaspace/ts) — MIT open commons.

Thin glue for `instrumentation.ts` — no log pipeline in the browser. `@sentry/nextjs` is an optional peer dependency; the package no-ops when DSN is unset.

## Install

```bash
pnpm add @manovaspace/observability
```

Peer dependencies: `next`. Optional: `@sentry/nextjs`.

## Usage

**`instrumentation.ts`** (project root)

```ts
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { registerNextInstrumentation } = await import(
      "@manovaspace/observability/next"
    );
    await registerNextInstrumentation({ serviceName: "my-app" });
  }
}
```

**Environment**

```env
NEXT_PUBLIC_SENTRY_DSN=https://…@sentry.example/…
```

`serviceName` identifies the app in Sentry. `environment` defaults to `NODE_ENV`.

## API

| Export | Description |
| --- | --- |
| `registerNextInstrumentation` | Call from Next.js `instrumentation.ts` (nodejs runtime) |
| `initObservability` | Lower-level init from `@manovaspace/observability` |

## Related packages

| Package | Use when |
| --- | --- |
| [`@manovaspace/tsconfig`](https://www.npmjs.com/package/@manovaspace/tsconfig) | Shared TypeScript presets |
| [`@manovaspace/pwa`](https://www.npmjs.com/package/@manovaspace/pwa) | PWA shell for the same Next.js app |
| [`@manovaspace/markdown`](https://www.npmjs.com/package/@manovaspace/markdown) | Content-heavy apps |

## Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) and [RELEASING.md](../../RELEASING.md) in the monorepo root.

## License

MIT — see [LICENSE](../../LICENSE).

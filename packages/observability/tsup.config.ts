import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "next/instrumentation": "src/next/instrumentation.ts",
  },
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: !process.argv.includes("--watch"),
  external: ["@sentry/nextjs", "next"],
  treeshake: true,
});

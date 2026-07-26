import { defineConfig } from "tsup";

// Bootstrap config — this package cannot import itself yet.
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: !process.argv.includes("--watch"),
  external: ["tsup"],
  treeshake: true,
});

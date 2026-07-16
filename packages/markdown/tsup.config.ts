import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: !process.argv.includes("--watch"),
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    "react-markdown",
    "remark-gfm",
  ],
  treeshake: true,
});

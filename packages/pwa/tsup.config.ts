import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "next/index": "src/next/index.ts",
    "react/serwist-shell": "src/react/serwist-shell.tsx",
    "sw/default": "src/sw/default.ts",
  },
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: !process.argv.includes("--watch"),
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    "next",
    "next/server",
    "@serwist/turbopack",
    "@serwist/turbopack/react",
    "serwist",
  ],
  treeshake: true,
});

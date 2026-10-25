import { defineConfig } from "tsup";

export default defineConfig([
  {
    name: "client",
    entry: {
      index: "src/index.ts",
      "react/index": "src/react/index.ts",
    },
    format: ["cjs", "esm"],
    dts: true,
    clean: false,
    sourcemap: true,
    external: ["react", "react-dom", "react/jsx-runtime", "@manovaspace/ui"],
    banner: { js: '"use client";' },
  },
  {
    name: "server",
    entry: { "server/index": "src/server/index.ts" },
    format: ["cjs", "esm"],
    dts: true,
    clean: false,
    sourcemap: true,
    external: ["react", "react-dom"],
  },
]);

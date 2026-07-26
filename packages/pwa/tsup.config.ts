import { defineReactLibraryConfig } from "@manovaspace/build";

export default defineReactLibraryConfig({
  entry: {
    index: "src/index.ts",
    "next/index": "src/next/index.ts",
    "react/serwist-shell": "src/react/serwist-shell.tsx",
    "sw/default": "src/sw/default.ts",
  },
  external: [
    "next",
    "next/server",
    "@serwist/turbopack",
    "@serwist/turbopack/react",
    "serwist",
  ],
});

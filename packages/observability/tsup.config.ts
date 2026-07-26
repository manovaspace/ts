import { defineLibraryConfig } from "@manovaspace/build";

export default defineLibraryConfig({
  entry: {
    index: "src/index.ts",
    "next/instrumentation": "src/next/instrumentation.ts",
  },
  external: ["@sentry/nextjs", "next"],
});

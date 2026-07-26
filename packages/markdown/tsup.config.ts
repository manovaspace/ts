import { defineReactLibraryConfig } from "@manovaspace/build";

export default defineReactLibraryConfig({
  entry: ["src/index.ts"],
  external: ["react-markdown", "remark-gfm"],
});

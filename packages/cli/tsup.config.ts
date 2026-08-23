import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/installer.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  treeshake: true,
  target: "node20",
});

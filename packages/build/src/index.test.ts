import { describe, expect, it } from "vitest";
import {
  REACT_EXTERNALS,
  defineLibraryConfig,
  defineReactLibraryConfig,
  defineUnbundledConfig,
} from "./index";

describe("@manovaspace/build", () => {
  it("defineLibraryConfig sets ESM defaults", () => {
    const cfg = defineLibraryConfig({ entry: ["src/index.ts"] });
    const opts = Array.isArray(cfg) ? cfg[0] : cfg;
    expect(opts.format).toEqual(["esm"]);
    expect(opts.dts).toBe(true);
    expect(opts.sourcemap).toBe(true);
    expect(opts.treeshake).toBe(true);
  });

  it("defineReactLibraryConfig merges React externals", () => {
    const cfg = defineReactLibraryConfig({
      entry: ["src/index.ts"],
      external: ["foo"],
    });
    const opts = Array.isArray(cfg) ? cfg[0] : cfg;
    expect(opts.external).toEqual([...REACT_EXTERNALS, "foo"]);
  });

  it("defineUnbundledConfig disables bundle and treeshake", () => {
    const cfg = defineUnbundledConfig({ entry: ["src/index.ts"] });
    const opts = Array.isArray(cfg) ? cfg[0] : cfg;
    expect(opts.bundle).toBe(false);
    expect(opts.treeshake).toBe(false);
  });
});

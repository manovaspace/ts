import { defineConfig, type Options } from "tsup";

/** True when tsup was invoked with `--watch`. */
export function isTsupWatch(): boolean {
  return process.argv.includes("--watch");
}

export const REACT_EXTERNALS = [
  "react",
  "react-dom",
  "react/jsx-runtime",
] as const;

type ExternalList = NonNullable<
  Exclude<Options["external"], (...args: never[]) => unknown>
>;

function mergeExternal(
  base: readonly (string | RegExp)[],
  extra: Options["external"] | undefined,
): Options["external"] {
  if (extra == null) {
    return [...base];
  }
  if (typeof extra === "function") {
    return extra;
  }
  const list: ExternalList = Array.isArray(extra) ? extra : [extra];
  return [...base, ...list];
}

function libraryDefaults(overrides: Options = {}): Options {
  const { external, clean, format, dts, sourcemap, treeshake, ...rest } =
    overrides;
  return {
    format: format ?? ["esm"],
    dts: dts ?? true,
    sourcemap: sourcemap ?? true,
    clean: clean ?? !isTsupWatch(),
    treeshake: treeshake ?? true,
    external: mergeExternal([], external),
    ...rest,
  };
}

/**
 * Baseline ESM library build: dts, sourcemaps, clean unless watch, treeshake.
 */
export function defineLibraryConfig(overrides: Options = {}) {
  return defineConfig(libraryDefaults(overrides));
}

/**
 * Library build with React (and jsx-runtime) marked external by default.
 * Pass additional `external` entries; they are merged with the React set.
 */
export function defineReactLibraryConfig(overrides: Options = {}) {
  const { external, ...rest } = overrides;
  return defineConfig(
    libraryDefaults({
      ...rest,
      external: mergeExternal(REACT_EXTERNALS, external),
    }),
  );
}

/**
 * Unbundled multi-entry build (e.g. component libraries that preserve
 * per-file structure). Disables bundling and treeshaking by default.
 */
export function defineUnbundledConfig(overrides: Options = {}) {
  const { bundle, treeshake, external, ...rest } = overrides;
  return defineConfig(
    libraryDefaults({
      ...rest,
      bundle: bundle ?? false,
      treeshake: treeshake ?? false,
      external: mergeExternal(REACT_EXTERNALS, external),
    }),
  );
}

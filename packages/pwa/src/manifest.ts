import type { MetadataRoute } from "next";

import { resolvePwaColors } from "./colors.js";
import type { WebAppManifestConfig } from "./types.js";

export function defineWebAppManifest(
  config: WebAppManifestConfig,
): MetadataRoute.Manifest {
  const colors = resolvePwaColors(config);

  return {
    name: config.name,
    short_name: config.shortName ?? config.name,
    description: config.description,
    start_url: config.startUrl ?? "/",
    display: config.display ?? "standalone",
    orientation: config.orientation,
    theme_color: colors.themeColor,
    background_color: colors.backgroundColor,
    icons: config.icons.map((icon) => ({
      src: icon.src,
      sizes: icon.sizes,
      type: icon.type ?? "image/png",
      purpose: icon.purpose,
    })),
  };
}

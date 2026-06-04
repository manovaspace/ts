import type { Metadata, Viewport } from "next";

import { resolvePwaColors } from "./colors.js";
import type { PwaMetadataConfig, PwaMetadataResult } from "./types.js";

export function definePwaMetadata(
  config: PwaMetadataConfig,
): PwaMetadataResult {
  const colors = resolvePwaColors(config);
  const titleTemplate =
    config.titleTemplate ?? `%s - ${config.applicationName}`;

  const metadata: Metadata = {
    applicationName: config.applicationName,
    title: {
      default: config.title,
      template: titleTemplate,
    },
    description: config.description,
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: config.title,
    },
    formatDetection: {
      telephone: false,
    },
    openGraph: {
      type: "website",
      siteName: config.applicationName,
      title: {
        default: config.title,
        template: titleTemplate,
      },
      description: config.description,
    },
    twitter: {
      card: "summary",
      title: {
        default: config.title,
        template: titleTemplate,
      },
      description: config.description,
    },
  };

  const viewport: Viewport = {
    themeColor: config.themeColors
      ? [
          {
            media: "(prefers-color-scheme: light)",
            color: config.themeColors.light.themeColor,
          },
          {
            media: "(prefers-color-scheme: dark)",
            color: config.themeColors.dark.themeColor,
          },
        ]
      : colors.themeColor,
  };

  return { metadata, viewport };
}

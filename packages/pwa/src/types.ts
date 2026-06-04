import type { Metadata, Viewport } from "next";

export type PwaIcon = {
  src: string;
  sizes: string;
  type?: string;
  purpose?: "any" | "maskable" | "monochrome";
};

export type WebAppManifestConfig = {
  name: string;
  shortName?: string;
  description?: string;
  icons: PwaIcon[];
  startUrl?: string;
  display?: "fullscreen" | "standalone" | "minimal-ui" | "browser";
  orientation?:
    | "any"
    | "natural"
    | "portrait"
    | "portrait-primary"
    | "portrait-secondary"
    | "landscape"
    | "landscape-primary"
    | "landscape-secondary";
  themeColor?: string;
  backgroundColor?: string;
  themeColors?: import("./colors.js").PwaThemeColors;
};

export type PwaMetadataConfig = {
  applicationName: string;
  title: string;
  titleTemplate?: string;
  description: string;
  themeColor?: string;
  themeColors?: import("./colors.js").PwaThemeColors;
};

export type PwaMetadataResult = {
  metadata: Metadata;
  viewport: Viewport;
};

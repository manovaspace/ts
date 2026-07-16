export type PwaColors = {
  themeColor: string;
  backgroundColor: string;
};

export type PwaThemeColors = {
  light: PwaColors;
  dark: PwaColors;
};

/** Build manifest/metadata colors from explicit light/dark values. */
export function resolvePwaColorsFromConfig(
  themeColors: PwaThemeColors,
): PwaThemeColors {
  return themeColors;
}

export function resolvePwaColors(config: {
  themeColor?: string;
  backgroundColor?: string;
  themeColors?: PwaThemeColors;
}): PwaColors {
  if (config.themeColors) {
    return config.themeColors.light;
  }

  return {
    themeColor: config.themeColor ?? "#ffffff",
    backgroundColor: config.backgroundColor ?? "#ffffff",
  };
}

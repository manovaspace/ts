import { describe, expect, it } from "vitest";

import { defineWebAppManifest } from "./manifest.js";

const icons = [
  {
    src: "/icons/icon-192.png",
    sizes: "192x192",
    purpose: "maskable" as const,
  },
  { src: "/icons/icon-512.png", sizes: "512x512" },
];

describe("defineWebAppManifest", () => {
  it("returns standalone manifest with defaults", () => {
    const manifest = defineWebAppManifest({
      name: "Test App",
      icons,
    });

    expect(manifest.name).toBe("Test App");
    expect(manifest.short_name).toBe("Test App");
    expect(manifest.display).toBe("standalone");
    expect(manifest.start_url).toBe("/");
    expect(manifest.icons).toHaveLength(2);
  });

  it("uses theme colors when provided", () => {
    const manifest = defineWebAppManifest({
      name: "Test App",
      icons,
      themeColors: {
        light: { themeColor: "#0d9488", backgroundColor: "#ffffff" },
        dark: { themeColor: "#115e59", backgroundColor: "#0c0a09" },
      },
    });

    expect(manifest.theme_color).toBe("#0d9488");
    expect(manifest.background_color).toBe("#ffffff");
  });

  it("respects locale start_url", () => {
    const manifest = defineWebAppManifest({
      name: "Test App",
      icons,
      startUrl: "/en",
    });

    expect(manifest.start_url).toBe("/en");
  });
});

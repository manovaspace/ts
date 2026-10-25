import { describe, expect, it } from "vitest";
import { resolveUpdateAvailable } from "../src/use-app-version-update";

describe("resolveUpdateAvailable", () => {
  it("returns false if remote buildId matches local buildId", () => {
    expect(
      resolveUpdateAvailable({
        localBuildId: "build-123",
        localEnvironment: "production",
        remoteBuildId: "build-123",
      }),
    ).toBe(false);
  });

  it("returns false if local build is development local", () => {
    expect(
      resolveUpdateAvailable({
        localBuildId: "local",
        localEnvironment: "development",
        remoteBuildId: "build-456",
      }),
    ).toBe(false);
  });

  it("returns true if remote buildId differs from local buildId", () => {
    expect(
      resolveUpdateAvailable({
        localBuildId: "build-123",
        localEnvironment: "production",
        remoteBuildId: "build-456",
      }),
    ).toBe(true);
  });

  it("returns false if remote buildId is missing or unknown", () => {
    expect(
      resolveUpdateAvailable({
        localBuildId: "build-123",
        localEnvironment: "production",
        remoteBuildId: "",
      }),
    ).toBe(false);

    expect(
      resolveUpdateAvailable({
        localBuildId: "build-123",
        localEnvironment: "production",
        remoteBuildId: "unknown",
      }),
    ).toBe(false);
  });

  it("returns true in staging when remote differs", () => {
    expect(
      resolveUpdateAvailable({
        localBuildId: "staging-1",
        localEnvironment: "staging",
        remoteBuildId: "staging-2",
      }),
    ).toBe(true);
  });
});

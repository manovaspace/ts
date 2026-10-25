import { describe, expect, it } from "vitest";
import { resolveWebVersionIdentity } from "../src/web-version-identity";

describe("resolveWebVersionIdentity", () => {
  it("falls back to local defaults when env is empty", () => {
    const identity = resolveWebVersionIdentity({
      packageVersion: "1.2.3",
      env: {},
    });
    expect(identity.version).toBe("1.2.3");
    expect(identity.buildId).toBe("local");
    expect(identity.builtAt).toBe("1970-01-01T00:00:00.000Z");
    expect(identity.environment).toBe("development");
  });

  it("reads explicit build metadata from env", () => {
    const identity = resolveWebVersionIdentity({
      packageVersion: "1.2.3",
      env: {
        NEXT_PUBLIC_APP_VERSION: "1.2.4",
        NEXT_PUBLIC_BUILD_ID: "abc1234",
        NEXT_PUBLIC_BUILD_TIME: "2026-09-17T04:00:00.000Z",
        NEXT_PUBLIC_DEPLOY_ENV: "production",
      },
    });
    expect(identity.version).toBe("1.2.4");
    expect(identity.buildId).toBe("abc1234");
    expect(identity.builtAt).toBe("2026-09-17T04:00:00.000Z");
    expect(identity.environment).toBe("production");
  });

  it("infers environment from NODE_ENV when DEPLOY_ENV is not specified", () => {
    const identity = resolveWebVersionIdentity({
      packageVersion: "1.0.0",
      env: {
        NODE_ENV: "production",
      },
    });
    expect(identity.environment).toBe("production");
  });
});

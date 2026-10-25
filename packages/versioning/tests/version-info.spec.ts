import { describe, expect, it } from "vitest";
import type { ApiVersionMetadata, WebVersionIdentity } from "../src/types";
import {
  buildSystemInfoClipboardJson,
  formatVisibleVersion,
  toPersianDigits,
} from "../src/version-info";

describe("version-info utilities", () => {
  it("converts ascii digits to Persian digits", () => {
    expect(toPersianDigits("1.2.3")).toBe("۱.۲.۳");
    expect(toPersianDigits("2026-09-17")).toBe("۲۰۲۶-۰۹-۱۷");
  });

  it("formats visible version correctly", () => {
    expect(formatVisibleVersion("0.1.0", true)).toBe("۰.۱.۰");
    expect(formatVisibleVersion("0.1.0", false)).toBe("0.1.0");
    expect(formatVisibleVersion("", true)).toBe("");
  });

  it("builds system info clipboard json without api when unavailable", () => {
    const web: WebVersionIdentity = {
      service: "web",
      version: "1.0.0",
      buildId: "abc1234",
      builtAt: "2026-09-17T00:00:00.000Z",
      environment: "production",
    };
    const json = buildSystemInfoClipboardJson(web, { status: "unavailable" });
    const parsed = JSON.parse(json);

    expect(parsed.environment).toBe("production");
    expect(parsed.web.version).toBe("1.0.0");
    expect(parsed.web.buildId).toBe("abc1234");
    expect(parsed.api).toBeUndefined();
  });

  it("builds system info clipboard json with api metadata when available", () => {
    const web: WebVersionIdentity = {
      service: "web",
      version: "1.0.0",
      buildId: "web123",
      builtAt: "2026-09-17T00:00:00.000Z",
      environment: "production",
    };
    const api: ApiVersionMetadata = {
      status: "available",
      identity: {
        service: "api",
        version: "2.0.0",
        buildId: "api456",
        builtAt: "2026-09-17T00:00:00.000Z",
        environment: "production",
        contractVersion: "1.0.0",
      },
    };
    const json = buildSystemInfoClipboardJson(web, api);
    const parsed = JSON.parse(json);

    expect(parsed.web.version).toBe("1.0.0");
    expect(parsed.api).toBeDefined();
    expect(parsed.api.version).toBe("2.0.0");
    expect(parsed.api.buildId).toBe("api456");
    expect(parsed.api.contractVersion).toBe("1.0.0");
  });
});

import { describe, expect, it } from "vitest";
import {
  AppVersionToast,
  formatToastVersionLabel,
} from "../src/components/app-version-toast";
import * as RootExports from "../src/index";
import * as ReactExports from "../src/react/index";

describe("formatToastVersionLabel", () => {
  it("formats version for Persian locale", () => {
    const label = formatToastVersionLabel("1.2.0", "fa");
    expect(label).toContain("۱.۲.۰");
  });

  it("formats version for English locale", () => {
    const label = formatToastVersionLabel("1.2.0", "en");
    expect(label).toContain("1.2.0");
  });

  it("defaults to Persian locale when locale is omitted", () => {
    const label = formatToastVersionLabel("2.4.1");
    expect(label).toContain("۲.۴.۱");
  });

  it("handles empty or missing version string", () => {
    expect(formatToastVersionLabel("")).toBe("");
  });
});

describe("AppVersionToast exports", () => {
  it("exports AppVersionToast component and helper from components/app-version-toast", () => {
    expect(typeof AppVersionToast).toBe("function");
    expect(typeof formatToastVersionLabel).toBe("function");
  });

  it("exports AppVersionToast component from react entry", () => {
    expect(typeof ReactExports.AppVersionToast).toBe("function");
    expect(typeof ReactExports.formatToastVersionLabel).toBe("function");
  });

  it("exports AppVersionToast component from root entry", () => {
    expect(typeof RootExports.AppVersionToast).toBe("function");
    expect(typeof RootExports.formatToastVersionLabel).toBe("function");
  });
});

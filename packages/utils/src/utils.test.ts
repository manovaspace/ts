import { describe, expect, it } from "vitest";
import {
  formatLocaleNumber,
  formatToman,
  isValidIranMobile,
  normalizeIranMobile,
  toLatinDigits,
  toPersianDigits,
} from "./index.js";

describe("Digits Utilities", () => {
  it("converts Latin digits to Persian digits", () => {
    expect(toPersianDigits("1234567890")).toBe("۱۲۳۴۵۶۷۸۹۰");
    expect(toPersianDigits(42)).toBe("۴۲");
  });

  it("converts Persian and Arabic digits to Latin digits", () => {
    expect(toLatinDigits("۱۲۳۴۵۶۷۸۹۰")).toBe("1234567890");
    expect(toLatinDigits("١٢٣٤٥٦٧٨٩٠")).toBe("1234567890");
  });

  it("formats locale numbers", () => {
    expect(formatLocaleNumber(1000000, { locale: "fa" })).toBe("۱٬۰۰۰٬۰۰۰");
    expect(formatLocaleNumber(1000000, { locale: "en" })).toBe("1,000,000");
  });
});

describe("Toman Currency Utilities", () => {
  it("formats Toman currency correctly with unit", () => {
    expect(formatToman(50000)).toBe("۵۰,۰۰۰ تومان");
    expect(formatToman("1200000")).toBe("۱,۲۰۰,۰۰۰ تومان");
  });

  it("formats Toman without unit and in English digits when requested", () => {
    expect(formatToman(50000, { showUnit: false, persianDigits: false })).toBe(
      "50,000",
    );
  });
});

describe("Phone Utilities", () => {
  it("normalizes diverse Iranian phone representations to standard 09xxxxxxxxx", () => {
    expect(normalizeIranMobile("+989123456789")).toBe("09123456789");
    expect(normalizeIranMobile("00989123456789")).toBe("09123456789");
    expect(normalizeIranMobile("989123456789")).toBe("09123456789");
    expect(normalizeIranMobile("9123456789")).toBe("09123456789");
    expect(normalizeIranMobile("۰۹۱۲۳۴۵۶۷۸۹")).toBe("09123456789");
    expect(normalizeIranMobile("0912-345-6789")).toBe("09123456789");
  });

  it("validates Iranian mobile numbers accurately", () => {
    expect(isValidIranMobile("09123456789")).toBe(true);
    expect(isValidIranMobile("+989351234567")).toBe(true);
    expect(isValidIranMobile("۰۹۱۲۳۴۵۶۷۸۹")).toBe(true);
    expect(isValidIranMobile("02188888888")).toBe(false);
    expect(isValidIranMobile("12345")).toBe(false);
  });
});

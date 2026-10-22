import { toLatinDigits } from "./digits.js";

const IRAN_MOBILE_REGEX = /^09\d{9}$/;

/**
 * Normalizes an Iranian mobile phone number to canonical 11-digit format (09xxxxxxxxx).
 * Handles +98, 0098, 98, Persian/Arabic digits, and leading spaces/hyphens.
 */
export function normalizeIranMobile(phone: string | null | undefined): string {
  if (!phone) return "";
  let cleaned = toLatinDigits(phone).replace(/[\s\-()]/g, "");

  if (cleaned.startsWith("+98")) {
    cleaned = `0${cleaned.slice(3)}`;
  } else if (cleaned.startsWith("0098")) {
    cleaned = `0${cleaned.slice(4)}`;
  } else if (cleaned.startsWith("98") && cleaned.length === 12) {
    cleaned = `0${cleaned.slice(2)}`;
  } else if (cleaned.length === 10 && cleaned.startsWith("9")) {
    cleaned = `0${cleaned}`;
  }

  return cleaned;
}

/**
 * Validates whether a given string is a valid 11-digit Iranian mobile phone number (09xxxxxxxxx).
 */
export function isValidIranMobile(phone: string | null | undefined): boolean {
  if (!phone) return false;
  const normalized = normalizeIranMobile(phone);
  return IRAN_MOBILE_REGEX.test(normalized);
}

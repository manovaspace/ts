const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
const ARABIC_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

/**
 * Converts Latin or Arabic digits in a string or number to Persian digits.
 */
export function toPersianDigits(
  input: string | number | null | undefined,
): string {
  if (input === null || input === undefined) return "";
  const str = String(input);
  return str
    .replace(/[0-9]/g, (char) => PERSIAN_DIGITS[Number(char)] ?? char)
    .replace(/[٠-٩]/g, (char) => {
      const idx = ARABIC_DIGITS.indexOf(char);
      return idx !== -1 ? (PERSIAN_DIGITS[idx] ?? char) : char;
    });
}

/**
 * Converts Persian and Arabic digits in a string to standard Latin/ASCII digits.
 */
export function toLatinDigits(input: string | null | undefined): string {
  if (!input) return "";
  let str = input;
  for (let i = 0; i < 10; i++) {
    const pDigit = PERSIAN_DIGITS[i];
    const aDigit = ARABIC_DIGITS[i];
    if (pDigit) {
      str = str.replaceAll(pDigit, String(i));
    }
    if (aDigit) {
      str = str.replaceAll(aDigit, String(i));
    }
  }
  return str;
}

/**
 * Formats a number with thousands separators according to locale and converts digits.
 */
export function formatLocaleNumber(
  value: number | string,
  options: { locale?: "fa" | "en"; separator?: boolean } = {},
): string {
  const { locale = "fa", separator = true } = options;
  const num = typeof value === "string" ? Number(toLatinDigits(value)) : value;
  if (Number.isNaN(num)) return String(value);

  const formatted = separator
    ? new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US").format(num)
    : String(num);

  return locale === "fa" ? toPersianDigits(formatted) : formatted;
}

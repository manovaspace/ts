import { toPersianDigits } from "./digits.js";

export interface FormatTomanOptions {
  /**
   * Whether to append the Persian currency unit ('تومان').
   * Default: true
   */
  showUnit?: boolean;
  /**
   * Whether to convert digits to Persian digits.
   * Default: true
   */
  persianDigits?: boolean;
}

/**
 * Formats an amount in Iranian Toman with thousands separators and optional unit.
 */
export function formatToman(
  amount: number | string,
  options: FormatTomanOptions = {},
): string {
  const { showUnit = true, persianDigits = true } = options;
  const num =
    typeof amount === "string"
      ? Number(amount.replace(/[^0-9.-]/g, ""))
      : amount;
  if (Number.isNaN(num)) return String(amount);

  const formattedNum = new Intl.NumberFormat("en-US").format(Math.round(num));
  const finalDigits = persianDigits
    ? toPersianDigits(formattedNum)
    : formattedNum;

  return showUnit ? `${finalDigits} تومان` : finalDigits;
}

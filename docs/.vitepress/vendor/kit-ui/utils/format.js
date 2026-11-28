/**
 * Format utilities — pure, SSR-safe helpers for currency, dates and numbers.
 * These mirror the Intl-based formatters from `katanakit-js` but live in the
 * UI package so examples and components can stay self-contained.
 */
/**
 * Formats an amount as currency using `Intl.NumberFormat`.
 *
 * @param options - Currency formatting options.
 * @returns The formatted currency string.
 *
 * @example
 * ```ts
 * formatCurrency({ amount: 100, currency: "USD" }); // "$100.00"
 * formatCurrency({ amount: 100, currency: "EUR", locale: "es" }); // "100,00 €"
 * formatCurrency({ amount: 100, rate: 21 }); // "$121.00" (21% tax)
 * ```
 */
export function formatCurrency(options) {
    const { amount, currency = "USD", locale = "en", digits, rate = 0 } = options;
    const normalizedRate = rate > 1 ? rate / 100 : rate;
    const total = amount * (1 + normalizedRate);
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        ...(digits === undefined ? {} : { minimumFractionDigits: digits, maximumFractionDigits: digits }),
    }).format(total);
}
/**
 * Formats a date as a human-readable label.
 *
 * @param options - Date formatting options.
 * @returns The formatted date string.
 *
 * @example
 * ```ts
 * dateLabel({ date: "2026-10-24" }); // "Oct 24, 2026"
 * dateLabel({ date: new Date("2026-10-24"), locale: "es" }); // "24 oct 2026"
 * ```
 */
export function dateLabel(options) {
    const { date, locale = "en", formatOptions } = options;
    const d = typeof date === "string" ? new Date(date) : date;
    return new Intl.DateTimeFormat(locale, {
        month: "short",
        day: "numeric",
        year: "numeric",
        ...formatOptions,
    }).format(d);
}
/**
 * Formats a plain number with locale-aware grouping (no currency symbol).
 *
 * @param options - Number formatting options.
 * @returns The formatted number string.
 *
 * @example
 * ```ts
 * amount({ value: 1234.5 }); // "1,234.50"
 * amount({ value: 1234.5, locale: "de" }); // "1.234,50"
 * amount({ value: 100, digits: 0 }); // "100"
 * ```
 */
export function amount(options) {
    const { value, locale = "en", digits = 2 } = options;
    return new Intl.NumberFormat(locale, {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
    }).format(value);
}

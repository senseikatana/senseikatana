import type {
	CurrencyFormatOptions,
	IFormatterService,
	Locale,
	SalePrice,
	SalePriceOptions,
} from "@/types/index.js";

/**
 * FormatterService — Singleton facade over `Intl.NumberFormat`, locale-aware
 * casing and `JSON`.
 *
 * Applies the **Singleton** pattern (one shared instance via
 * {@link FormatterService.getInstance}) and the **Facade** pattern: each public
 * method hides the `Intl`/`JSON` details behind one call. Everything is pure —
 * no state, no I/O — so the instance is safe to share across environments
 * (Node, Bun, browser, SSR).
 *
 * Every public method uses the `use*` prefix per `CONTRIBUTING.md`; the module
 * level `use*` functions below are thin wrappers kept for call-site ergonomics.
 *
 * @example
 * ```ts
 * import { useFormatNumber } from "katanakit-js";
 *
 * useFormatNumber(1234.5, "en", 2); // "1,234.50"
 * ```
 */
export class FormatterService implements IFormatterService {
	private static instance: FormatterService;

	/** Private constructor — enforce Singleton. */
	private constructor() {}

	/** Returns the shared instance (Singleton). */
	static getInstance(): FormatterService {
		if (!FormatterService.instance) {
			FormatterService.instance = new FormatterService();
		}
		return FormatterService.instance;
	}

	/**
	 * Shared rate convention for taxes and discounts.
	 *
	 * Values `> 1` are percentages (`21` → 21%); values in `(0, 1]` are
	 * decimal fractions (`0.21` → 21%). Prefer an explicit fraction when you
	 * need a rate ≤ 1%.
	 *
	 * @param rate - The rate to normalize. `undefined`/`0` → `0`.
	 * @returns The rate as a decimal fraction.
	 */
	private normalizeRate(rate: number | undefined): number {
		if (!rate) return 0;
		return rate > 1 ? rate / 100 : rate;
	}

	/**
	 * Pure number formatter over `Intl.NumberFormat`.
	 *
	 * @param value - The number to format.
	 * @param locale - BCP 47 locale tag. Defaults to `"en"`.
	 * @param digits - Maximum and minimum fraction digits. Defaults to `2`.
	 * @returns The formatted number string.
	 *
	 * @example
	 * ```ts
	 * import { useFormatNumber } from "katanakit-js";
	 *
	 * useFormatNumber(1234.5, "en", 2); // "1,234.50"
	 * useFormatNumber(1234.5, "de", 2); // "1.234,50"
	 * ```
	 */
	useFormatNumber(value: number, locale: Locale = "en", digits = 2): string {
		return new Intl.NumberFormat(locale, {
			maximumFractionDigits: digits,
			minimumFractionDigits: digits,
		}).format(value);
	}

	/**
	 * Pure: locale-aware upper case (trims whitespace).
	 *
	 * @param text - The string to transform.
	 * @param locale - BCP 47 locale tag. Defaults to `"en"`.
	 * @returns The upper-cased, trimmed string.
	 *
	 * @example
	 * ```ts
	 * import { useUpperCase } from "katanakit-js";
	 *
	 * useUpperCase("hello"); // "HELLO"
	 * useUpperCase("straße", "de"); // "STRASSE"
	 * ```
	 */
	useUpperCase(text: string, locale: Locale = "en"): string {
		return text.toLocaleUpperCase(locale).trim();
	}

	/**
	 * Pure: locale-aware lower case (trims whitespace).
	 *
	 * @param text - The string to transform.
	 * @param locale - BCP 47 locale tag. Defaults to `"en"`.
	 * @returns The lower-cased, trimmed string.
	 *
	 * @example
	 * ```ts
	 * import { useLowerCase } from "katanakit-js";
	 *
	 * useLowerCase("HELLO"); // "hello"
	 * ```
	 */
	useLowerCase(text: string, locale: Locale = "en"): string {
		return text.toLocaleLowerCase(locale).trim();
	}

	/**
	 * Pure: capitalizes the first character; leaves the rest unchanged.
	 *
	 * @param text - The string to capitalize.
	 * @param locale - BCP 47 locale tag. Defaults to `"en"`.
	 * @returns The string with its first character upper-cased.
	 *
	 * @example
	 * ```ts
	 * import { useCapitalize } from "katanakit-js";
	 *
	 * useCapitalize("hello world"); // "Hello world"
	 * ```
	 */
	useCapitalize(text: string, locale: Locale = "en"): string {
		const trimmed = text.trim();
		if (!trimmed) return "";
		return trimmed.charAt(0).toLocaleUpperCase(locale) + trimmed.slice(1);
	}

	/**
	 * Pure: formats an amount as currency.
	 *
	 * `taxes` follows the shared rate convention: percentage (`21` → 21%) or
	 * decimal fraction (`0.21` → 21%). Values `> 1` are percentages; values in
	 * `(0, 1]` are fractions.
	 *
	 * By default the fraction digits are the currency's own (`"¥100"`, `"$1.00"`),
	 * exactly as `Intl` defines them. Pass `digits` to pin an exact count —
	 * `digits: 2` prints two decimals even for zero-decimal currencies
	 * (`"¥100.00"`).
	 *
	 * @param options - Currency formatting options.
	 * @returns The formatted currency string.
	 *
	 * @example
	 * ```ts
	 * import { useFormatCurrency } from "katanakit-js";
	 *
	 * useFormatCurrency({ amount: 100, currency: "USD" }); // "$100.00"
	 * useFormatCurrency({ amount: 100, taxes: 21 }); // "$121.00"
	 * useFormatCurrency({ amount: 100, taxes: 0.21, locale: "es" }); // "121,00 €"
	 * useFormatCurrency({ amount: 100, currency: "JPY" }); // "¥100"
	 * useFormatCurrency({ amount: 100, currency: "JPY", digits: 2 }); // "¥100.00"
	 * ```
	 */
	useFormatCurrency(options: CurrencyFormatOptions): string {
		const { amount, currency = "USD", taxes = 0, locale = "en", digits } = options;
		const total = amount * (1 + this.normalizeRate(taxes));

		return new Intl.NumberFormat(locale, {
			style: "currency",
			currency,
			// Preserve `Intl`'s per-currency digits unless the caller pins them.
			...(digits === undefined
				? {}
				: { minimumFractionDigits: digits, maximumFractionDigits: digits }),
		}).format(total);
	}

	/**
	 * Pure: applies a discount to a price and reports what was taken off.
	 *
	 * `discount` follows the same rate convention as `taxes` in
	 * {@link FormatterService.useFormatCurrency}: percentage (`40` → 40%) or
	 * decimal fraction (`0.4` → 40%).
	 *
	 * The returned `salePrice` is unrounded, so it survives markup chains (10% +
	 * 20% of the same base) without accumulating error; pass it straight to
	 * {@link FormatterService.useFormatCurrency} to get the digits the currency
	 * demands. Only `percentOff` is rounded, because it exists to be displayed.
	 *
	 * @param options - Price and discount rate.
	 * @returns The regular price, the discounted price and the rounded percentage.
	 *
	 * @example
	 * ```ts
	 * import { useFormatCurrency, useSalePrice } from "katanakit-js";
	 *
	 * const sale = useSalePrice({ price: 29.99, discount: 40 });
	 * // { price: 29.99, salePrice: 17.994, percentOff: 40 }
	 *
	 * useFormatCurrency({ amount: sale.salePrice, currency: "EUR", locale: "es" }); // "17,99 €"
	 * ```
	 */
	useSalePrice(options: SalePriceOptions): SalePrice {
		const { price, discount } = options;
		const rate = this.normalizeRate(discount);
		const salePrice = price * (1 - rate);

		// `19.99 * 0.6` is 11.994000000000002 in IEEE-754: round the percentage
		// that users read, and leave the price to the currency formatter.
		return { price, salePrice, percentOff: Math.round(rate * 10000) / 100 };
	}

	/**
	 * Pure: pretty-print JSON (3-space indent).
	 *
	 * @param data - The value to serialize.
	 * @returns The indented JSON string.
	 *
	 * @example
	 * ```ts
	 * import { useJsonStringify } from "katanakit-js";
	 *
	 * useJsonStringify({ a: 1 });
	 * // '{\n   "a": 1\n}'
	 * ```
	 */
	useJsonStringify(data: unknown): string {
		return JSON.stringify(data, null, 3);
	}

	/**
	 * Pure: parse JSON (throws on invalid input — same as `JSON.parse`).
	 *
	 * @typeParam T - Expected parsed shape.
	 * @param json - The JSON string to parse.
	 * @returns The parsed value typed as `T`.
	 *
	 * @example
	 * ```ts
	 * import { useJsonParse } from "katanakit-js";
	 *
	 * const obj = useJsonParse<{ a: number }>('{"a":1}');
	 * // { a: 1 }
	 * ```
	 */
	useJsonParse<T = unknown>(json: string): T {
		return JSON.parse(json) as T;
	}
}

/** Formats a number. See {@link FormatterService.useFormatNumber}. */
export function useFormatNumber(value: number, locale: Locale = "en", digits = 2): string {
	return FormatterService.getInstance().useFormatNumber(value, locale, digits);
}

/** Locale-aware upper case. See {@link FormatterService.useUpperCase}. */
export function useUpperCase(text: string, locale: Locale = "en"): string {
	return FormatterService.getInstance().useUpperCase(text, locale);
}

/** Locale-aware lower case. See {@link FormatterService.useLowerCase}. */
export function useLowerCase(text: string, locale: Locale = "en"): string {
	return FormatterService.getInstance().useLowerCase(text, locale);
}

/** Capitalizes the first character. See {@link FormatterService.useCapitalize}. */
export function useCapitalize(text: string, locale: Locale = "en"): string {
	return FormatterService.getInstance().useCapitalize(text, locale);
}

/** Formats an amount as currency. See {@link FormatterService.useFormatCurrency}. */
export function useFormatCurrency(options: CurrencyFormatOptions): string {
	return FormatterService.getInstance().useFormatCurrency(options);
}

/** Applies a discount and reports it. See {@link FormatterService.useSalePrice}. */
export function useSalePrice(options: SalePriceOptions): SalePrice {
	return FormatterService.getInstance().useSalePrice(options);
}

/** Pretty-prints JSON. See {@link FormatterService.useJsonStringify}. */
export function useJsonStringify(data: unknown): string {
	return FormatterService.getInstance().useJsonStringify(data);
}

/** Parses JSON. See {@link FormatterService.useJsonParse}. */
export function useJsonParse<T = unknown>(json: string): T {
	return FormatterService.getInstance().useJsonParse<T>(json);
}

import type { IConverterService, IFormatterService, Locale } from "@/types/index.js";

import { FormatterService } from "./formatter.service.js";

/**
 * UnitConverterService — Singleton facade for physical unit conversions.
 *
 * Applies the **Singleton** pattern ({@link UnitConverterService.getInstance}),
 * the **Facade** pattern (one call per conversion) and **Dependency Injection**:
 * it never formats numbers itself, it delegates to an injected
 * {@link IFormatterService}. Swap that dependency through
 * {@link UnitConverterService.create} or {@link UnitConverterService.useSetFormatter}.
 *
 * Every conversion is pure and returns a formatted string; the underlying
 * factors are instance state, never statics.
 *
 * @example
 * ```ts
 * import { useToKilometers } from "katanakit-js";
 *
 * useToKilometers(1); // "1.61"
 * ```
 */
export class UnitConverterService implements IConverterService {
	private static instance: UnitConverterService;

	/** Number formatter dependency — injected, never imported at call sites. */
	private formatter: IFormatterService;

	/** International statute mile in kilometers (shared by both directions). */
	private readonly kmPerMile = 1.60934;
	/** International avoirdupois pound in kilograms. */
	private readonly kgPerPound = 0.453592;
	/** International inch in centimeters. */
	private readonly cmPerInch = 2.54;

	/** Private constructor — enforce Singleton. */
	private constructor(formatter?: IFormatterService) {
		this.formatter = formatter ?? FormatterService.getInstance();
	}

	/** Returns the shared instance (Singleton). */
	static getInstance(): UnitConverterService {
		if (!UnitConverterService.instance) {
			UnitConverterService.instance = new UnitConverterService();
		}
		return UnitConverterService.instance;
	}

	/**
	 * Creates a NO-singleton instance with an injected formatter (DI).
	 * Useful for tests or for custom number formatting.
	 *
	 * @param formatter - Formatter to inject. Defaults to `FormatterService`.
	 * @returns A new {@link UnitConverterService}.
	 *
	 * @example
	 * ```ts
	 * const converter = UnitConverterService.create(myFormatter);
	 * ```
	 */
	static create(formatter?: IFormatterService): UnitConverterService {
		return new UnitConverterService(formatter);
	}

	/**
	 * Swaps the number formatter dependency at runtime (DI).
	 *
	 * @param formatter - The new formatter to delegate to.
	 */
	useSetFormatter(formatter: IFormatterService): void {
		this.formatter = formatter;
	}

	/** Formats a converted value through the injected formatter. */
	private format(value: number, locale: Locale, digits: number): string {
		return this.formatter.useFormatNumber(value, locale, digits);
	}

	/**
	 * Pure: °F → °C (formatted).
	 *
	 * @param fahrenheit - Temperature in Fahrenheit.
	 * @param locale - BCP 47 locale tag. Defaults to `"en"`.
	 * @param digits - Fraction digits. Defaults to `2`.
	 * @returns The formatted Celsius string.
	 *
	 * @example
	 * ```ts
	 * import { useToCelsius } from "katanakit-js";
	 *
	 * useToCelsius(212); // "100.00"
	 * useToCelsius(32);  // "0.00"
	 * ```
	 */
	useToCelsius(fahrenheit: number, locale: Locale = "en", digits = 2): string {
		return this.format((fahrenheit - 32) / 1.8, locale, digits);
	}

	/**
	 * Pure: °C → °F (formatted).
	 *
	 * @param celsius - Temperature in Celsius.
	 * @param locale - BCP 47 locale tag. Defaults to `"en"`.
	 * @param digits - Fraction digits. Defaults to `2`.
	 * @returns The formatted Fahrenheit string.
	 *
	 * @example
	 * ```ts
	 * import { useToFahrenheit } from "katanakit-js";
	 *
	 * useToFahrenheit(100); // "212.00"
	 * useToFahrenheit(0);   // "32.00"
	 * ```
	 */
	useToFahrenheit(celsius: number, locale: Locale = "en", digits = 2): string {
		return this.format(celsius * 1.8 + 32, locale, digits);
	}

	/**
	 * Pure: miles → kilometers (formatted). Round-trips with {@link UnitConverterService.useToMiles}.
	 *
	 * @param miles - Distance in miles.
	 * @param locale - BCP 47 locale tag. Defaults to `"en"`.
	 * @param digits - Fraction digits. Defaults to `2`.
	 * @returns The formatted kilometer string.
	 *
	 * @example
	 * ```ts
	 * import { useToKilometers } from "katanakit-js";
	 *
	 * useToKilometers(1); // "1.61"
	 * ```
	 */
	useToKilometers(miles: number, locale: Locale = "en", digits = 2): string {
		return this.format(miles * this.kmPerMile, locale, digits);
	}

	/**
	 * Pure: kilometers → miles (formatted). Round-trips with {@link UnitConverterService.useToKilometers}.
	 *
	 * @param km - Distance in kilometers.
	 * @param locale - BCP 47 locale tag. Defaults to `"en"`.
	 * @param digits - Fraction digits. Defaults to `2`.
	 * @returns The formatted mile string.
	 *
	 * @example
	 * ```ts
	 * import { useToMiles } from "katanakit-js";
	 *
	 * useToMiles(1.60934); // "1.00"
	 * ```
	 */
	useToMiles(km: number, locale: Locale = "en", digits = 2): string {
		return this.format(km / this.kmPerMile, locale, digits);
	}

	/**
	 * Pure: centimeters → inches (formatted).
	 *
	 * @param cm - Length in centimeters.
	 * @param locale - BCP 47 locale tag. Defaults to `"en"`.
	 * @param digits - Fraction digits. Defaults to `2`.
	 * @returns The formatted inch string.
	 *
	 * @example
	 * ```ts
	 * import { useToInches } from "katanakit-js";
	 *
	 * useToInches(2.54); // "1.00"
	 * ```
	 */
	useToInches(cm: number, locale: Locale = "en", digits = 2): string {
		return this.format(cm / this.cmPerInch, locale, digits);
	}

	/**
	 * Pure: inches → centimeters (formatted).
	 *
	 * @param inches - Length in inches.
	 * @param locale - BCP 47 locale tag. Defaults to `"en"`.
	 * @param digits - Fraction digits. Defaults to `2`.
	 * @returns The formatted centimeter string.
	 *
	 * @example
	 * ```ts
	 * import { useToCm } from "katanakit-js";
	 *
	 * useToCm(1); // "2.54"
	 * ```
	 */
	useToCm(inches: number, locale: Locale = "en", digits = 2): string {
		return this.format(inches * this.cmPerInch, locale, digits);
	}

	/**
	 * Pure: pounds → kilograms (formatted).
	 *
	 * @param pounds - Weight in pounds.
	 * @param locale - BCP 47 locale tag. Defaults to `"en"`.
	 * @param digits - Fraction digits. Defaults to `2`.
	 * @returns The formatted kilogram string.
	 *
	 * @example
	 * ```ts
	 * import { useToKilos } from "katanakit-js";
	 *
	 * useToKilos(1); // "0.45"
	 * ```
	 */
	useToKilos(pounds: number, locale: Locale = "en", digits = 2): string {
		return this.format(pounds * this.kgPerPound, locale, digits);
	}

	/**
	 * Pure: kilograms → pounds (formatted).
	 *
	 * @param kilos - Weight in kilograms.
	 * @param locale - BCP 47 locale tag. Defaults to `"en"`.
	 * @param digits - Fraction digits. Defaults to `2`.
	 * @returns The formatted pound string.
	 *
	 * @example
	 * ```ts
	 * import { useToPounds } from "katanakit-js";
	 *
	 * useToPounds(1); // "2.20"
	 * ```
	 */
	useToPounds(kilos: number, locale: Locale = "en", digits = 2): string {
		return this.format(kilos / this.kgPerPound, locale, digits);
	}
}

/** °F → °C. See {@link UnitConverterService.useToCelsius}. */
export function useToCelsius(fahrenheit: number, locale: Locale = "en", digits = 2): string {
	return UnitConverterService.getInstance().useToCelsius(fahrenheit, locale, digits);
}

/** °C → °F. See {@link UnitConverterService.useToFahrenheit}. */
export function useToFahrenheit(celsius: number, locale: Locale = "en", digits = 2): string {
	return UnitConverterService.getInstance().useToFahrenheit(celsius, locale, digits);
}

/** Miles → kilometers. See {@link UnitConverterService.useToKilometers}. */
export function useToKilometers(miles: number, locale: Locale = "en", digits = 2): string {
	return UnitConverterService.getInstance().useToKilometers(miles, locale, digits);
}

/** Kilometers → miles. See {@link UnitConverterService.useToMiles}. */
export function useToMiles(km: number, locale: Locale = "en", digits = 2): string {
	return UnitConverterService.getInstance().useToMiles(km, locale, digits);
}

/** Centimeters → inches. See {@link UnitConverterService.useToInches}. */
export function useToInches(cm: number, locale: Locale = "en", digits = 2): string {
	return UnitConverterService.getInstance().useToInches(cm, locale, digits);
}

/** Inches → centimeters. See {@link UnitConverterService.useToCm}. */
export function useToCm(inches: number, locale: Locale = "en", digits = 2): string {
	return UnitConverterService.getInstance().useToCm(inches, locale, digits);
}

/** Pounds → kilograms. See {@link UnitConverterService.useToKilos}. */
export function useToKilos(pounds: number, locale: Locale = "en", digits = 2): string {
	return UnitConverterService.getInstance().useToKilos(pounds, locale, digits);
}

/** Kilograms → pounds. See {@link UnitConverterService.useToPounds}. */
export function useToPounds(kilos: number, locale: Locale = "en", digits = 2): string {
	return UnitConverterService.getInstance().useToPounds(kilos, locale, digits);
}

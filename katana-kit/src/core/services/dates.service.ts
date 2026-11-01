import { Temporal } from "@js-temporal/polyfill";

import { DateUnitSchema } from "@/schemas/core.schema.js";
import type { DateOrder, DateUnit, Locale, TemporalInput } from "@/types/index.js";

import { useLogger } from "./logger.service.js";

/**
 * Units finer than a calendar day.
 *
 * Temporal's `PlainDate` has no sub-day arithmetic at all — asking it for
 * hours throws rather than assuming midnight. Promoting to `PlainDateTime` is
 * what makes `useDateBetween(a, b, "hours")` answerable.
 */
const SUB_DAY_UNITS: ReadonlySet<DateUnit> = new Set<DateUnit>(["hours", "minutes"]);

/**
 * A string that is nothing but a calendar date: `YYYY-MM-DD`.
 *
 * This exists because `Temporal.PlainDate.from` happily **accepts**
 * `"2026-03-01T09:00:00"` and silently discards the time, so a bare
 * try/catch around `PlainDate` cannot tell the two apart. Shape is the
 * only reliable signal.
 */
const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;

/**
 * A datetime that names its own offset: `...Z`, `...+02:00`, `...-05:30`, `...+02`.
 *
 * This check cannot be delegated to a `try/catch` around `PlainDateTime.from`. That
 * parser rejects only the `Z` designator and **silently accepts and discards** numeric
 * offsets — `PlainDateTime.from("12:00+02:00")` yields `12:00`, quietly shifting the
 * answer by two hours instead of failing. Deciding the parser by trial and error
 * therefore routes `Z` to the correct `Instant` branch while quietly sending `+02:00`
 * down the lossy one. Shape is the only reliable signal, so the offset is detected up
 * front.
 *
 * The leading `T` keeps a bare date from matching on its own `-DD` day component.
 */
const HAS_OFFSET = /T.*(?:[Zz]|[+-]\d{2}(?::?\d{2})?)$/;

/** A calendar date or date-time, the two shapes the arithmetic helpers accept. */
type Comparable = Temporal.PlainDate | Temporal.PlainDateTime;

/** Narrows a validated unit, falling back to `days` for anything unexpected. */
function useUnit(unit: unknown): DateUnit {
	const parsed = DateUnitSchema.safeParse(unit);
	return parsed.success ? parsed.data : "days";
}

/**
 * Three-way comparison across both comparable shapes.
 *
 * Going through `PlainDateTime` rather than calling each type's own
 * `compare` means one code path decides the ordering, instead of a branch per
 * shape that could disagree about what a bare date means.
 */
function useOrder(a: Comparable, b: Comparable): DateOrder {
	const left = a instanceof Temporal.PlainDateTime ? a : a.toPlainDateTime();
	const right = b instanceof Temporal.PlainDateTime ? b : b.toPlainDateTime();
	const compared = Temporal.PlainDateTime.compare(left, right);
	return compared < 0 ? "before" : compared > 0 ? "after" : "same";
}

/**
 * DatesService - Singleton para operaciones de fechas.
 *
 * Aplica el patrón Singleton: una única instancia reutilizable que centraliza
 * toda la lógica de fechas (diferencias, formateo, aritmética y comparaciones).
 * Puro, sin I/O, seguro para SSR.
 */
export class DatesService {
	private static instance: DatesService;

	/**
	 * Constructor privado - enforce singleton.
	 */
	private constructor() {}

	/**
	 * Obtiene la instancia única del DatesService (Singleton).
	 *
	 * @returns La instancia única de {@link DatesService}.
	 *
	 * @example
	 * ```ts
	 * const dates = DatesService.getInstance();
	 * dates.useNow();
	 * ```
	 */
	static getInstance(): DatesService {
		if (!DatesService.instance) {
			DatesService.instance = new DatesService();
		}
		return DatesService.instance;
	}

	/**
	 * Internal helper that adapts flexible inputs into a `PlainDate`.
	 *
	 * @param date - An ISO date string or a `Temporal.PlainDate`.
	 * @returns A `Temporal.PlainDate`.
	 */
	private toPlainDate(date: string | Temporal.PlainDate): Temporal.PlainDate {
		return typeof date === "string" ? Temporal.PlainDate.from(date) : date;
	}

	/**
	 * Normalises any accepted input into the narrowest shape that can carry the
	 * requested arithmetic.
	 *
	 * Promotes a bare calendar date to midnight, which is what makes a sub-day
	 * unit answerable at all: `useDateBetween(a, b, "hours")` across two
	 * date-only inputs returns 744 for a 31-day gap rather than throwing. It
	 * does not change the span, only the scale it is reported in.
	 */
	private toComparable(date: TemporalInput, promote: boolean): Comparable {
		if (typeof date === "string") return this.fromString(date, promote);

		if (date instanceof Temporal.PlainDate) {
			return promote ? date.toPlainDateTime() : date;
		}
		if (date instanceof Temporal.PlainDateTime) return date;
		if (date instanceof Temporal.ZonedDateTime) {
			return promote ? date.toPlainDateTime() : date.toPlainDate();
		}
		if (date instanceof Temporal.Instant) {
			const zoned = date.toZonedDateTimeISO(Temporal.Now.timeZoneId());
			return promote ? zoned.toPlainDateTime() : zoned.toPlainDate();
		}
		if (date instanceof Date) return this.toComparable(date.getTime(), promote);
		if (typeof date === "number") {
			const zoned = Temporal.Instant.fromEpochMilliseconds(date).toZonedDateTimeISO(
				Temporal.Now.timeZoneId(),
			);
			return promote ? zoned.toPlainDateTime() : zoned.toPlainDate();
		}
		return date;
	}

	/**
	 * Parses a string into the shape its own syntax implies.
	 *
	 * A `Z` or numeric offset names an absolute instant, so it goes through `Instant`
	 * and lands in the local zone. Dropping the offset instead would silently shift the
	 * answer by hours, so the offset-bearing branch is chosen by {@link HAS_OFFSET},
	 * never by trial.
	 */
	private fromString(text: string, promote: boolean): Comparable {
		if (DATE_ONLY.test(text)) {
			const date = Temporal.PlainDate.from(text);
			return promote ? date.toPlainDateTime() : date;
		}

		// Bare datetime — a local wall-clock reading, with no offset to apply.
		if (!HAS_OFFSET.test(text)) {
			return Temporal.PlainDateTime.from(text);
		}

		// Offset-bearing — resolve to the real instant, then read it in the local zone.
		const zoned = Temporal.Instant.from(text).toZonedDateTimeISO(Temporal.Now.timeZoneId());
		return promote ? zoned.toPlainDateTime() : zoned.toPlainDate();
	}

	/**
	 * Returns the whole number of `unit`s between two dates.
	 *
	 * Signed, like Notion's `dateBetween`: a later `end` is positive, an
	 * earlier one negative. Never fractional — `total()` reports `0.0849` years
	 * across a month because a year is not a whole number of months, and a
	 * fractional year count is noise for a calendar API.
	 *
	 * @param start - Range start (any `TemporalInput`).
	 * @param end - Range end (any `TemporalInput`).
	 * @param unit - Granularity to report; defaults to `days`.
	 *
	 * @example
	 * ```ts
	 * useDateBetween("2020-01-01", "2022-04-16");            // 836
	 * useDateBetween("2020-01-01", "2022-04-16", "months");  // 27
	 * useDateBetween("2022-04-16", "2020-01-01", "days");   // -836
	 * ```
	 */
	useDateBetween(start: TemporalInput, end: TemporalInput, unit: DateUnit = "days"): number {
		const resolved = useUnit(unit);
		const subDay = SUB_DAY_UNITS.has(resolved);
		const from = this.toComparable(start, subDay);
		const to = this.toComparable(end, subDay);

		// Quarters are exactly three months; Temporal has no quarter arithmetic,
		// so derive the month count and divide rather than inventing a calendar.
		if (resolved === "quarters") {
			const months = from
				.until(to, { largestUnit: "year" })
				.total({ unit: "months", relativeTo: from });
			return Math.trunc(months / 3);
		}

		// `relativeTo` is mandatory whenever the duration spans months: without a
		// starting point, `total()` cannot know how long "one month" was.
		return Math.trunc(
			from.until(to, { largestUnit: "year" }).total({ unit: resolved, relativeTo: from }),
		);
	}

	/**
	 * Returns the balanced breakdown of the span between two dates, without
	 * collapsing it to prose or to a single number.
	 *
	 * The shape is Temporal's own, so `.years`, `.months` and `.days` are
	 * available separately — which a single formatted string cannot give you
	 * without parsing English out of it.
	 *
	 * @example
	 * ```ts
	 * const span = useDurationBetween("2020-01-01", "2022-04-16");
	 * span.years;  // 2
	 * span.months; // 3
	 * span.days;   // 15
	 * ```
	 */
	useDurationBetween(start: TemporalInput, end: TemporalInput): Temporal.Duration {
		const from = this.toComparable(start, false);
		const to = this.toComparable(end, false);
		return from.until(to, { largestUnit: "year" });
	}

	/**
	 * Returns the date a given number of units away, preserving calendar
	 * semantics — adding one month to the 31st lands on the 31st of a shorter
	 * month, not on an overflow.
	 *
	 * @param date - Starting date.
	 * @param amount - Signed amount; negative moves backwards.
	 * @param unit - Granularity to move by.
	 *
	 * @example
	 * ```ts
	 * useDateAdd("2026-01-31", 1, "months");  // "2026-02-28"
	 * useDateAdd(useNow(), 14, "days");       // two weeks out
	 * useDateAdd("2026-01-01", 2, "quarters");// "2026-07-01"
	 * ```
	 */
	useDateAdd(date: TemporalInput, amount: number, unit: DateUnit): string {
		return this.shift(date, amount, unit, "add");
	}

	/** Subtracts units from a date. The mirror of {@link useDateAdd}. */
	useDateSubtract(date: TemporalInput, amount: number, unit: DateUnit): string {
		return this.shift(date, amount, unit, "subtract");
	}

	/** Shared implementation for add/subtract, so neither can drift. */
	private shift(
		date: TemporalInput,
		amount: number,
		unit: DateUnit,
		direction: "add" | "subtract",
	): string {
		const resolved = useUnit(unit);
		const value = Number.isFinite(amount) ? amount : 0;
		const subDay = SUB_DAY_UNITS.has(resolved);
		const from = this.toComparable(date, subDay);

		const fields: Record<DateUnit, number> = {
			years: value,
			// A quarter is three months; there is no shorter honest answer.
			quarters: value * 3,
			months: value,
			weeks: value,
			days: value,
			hours: value,
			minutes: value,
		};

		const shifted = from[direction]({
			[resolved === "quarters" ? "months" : resolved]: fields[resolved],
		} as never);
		return shifted.toString();
	}

	/**
	 * Returns which of two dates comes first.
	 *
	 * A three-way comparison is what a date range filter actually needs —
	 * `before` and `after` answer different queries, and collapsing them into
	 * a boolean loses the direction you were asked about.
	 *
	 * @example
	 * ```ts
	 * useDateOrder(deadline, useNow()); // "before" | "after" | "same"
	 * ```
	 */
	useDateOrder(date1: TemporalInput, date2: TemporalInput): DateOrder {
		// Promote unconditionally. `useOrder` normalises both sides to `PlainDateTime`
		// anyway, so a date-only input lands on midnight and keeps its usual meaning —
		// whereas leaving an offset-bearing input unpromoted collapses it to a
		// `PlainDate`, reporting two instants an hour apart as "same".
		return useOrder(this.toComparable(date1, true), this.toComparable(date2, true));
	}

	/**
	 * Formats a date input into a localised string using `Intl.DateTimeFormat`.
	 *
	 * Accepts epoch milliseconds, ISO strings, native `Date` objects,
	 * `Temporal.Instant`, or any `Temporal` date/time type.
	 *
	 * @param dateInput - The value to format.
	 * @param locale - BCP 47 locale tag (defaults to `"en"`).
	 * @param options - `Intl.DateTimeFormatOptions` (defaults to `{}`).
	 * @returns The formatted date string.
	 * @throws {Error} If the input cannot be parsed as a date.
	 *
	 * @example
	 * ```ts
	 * useFormat("2024-06-15");                        // "6/15/2024" (en-US)
	 * useFormat(Date.now(), "es", { dateStyle: "full" }); // "sábado, 15 de junio de 2024"
	 * ```
	 */
	useFormat(
		dateInput: TemporalInput,
		locale: Locale = "en",
		options: Intl.DateTimeFormatOptions = {},
	): string {
		let date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime;

		try {
			if (typeof dateInput === "number") {
				date = Temporal.Instant.fromEpochMilliseconds(dateInput).toZonedDateTimeISO(
					Temporal.Now.timeZoneId(),
				);
			} else if (typeof dateInput === "string") {
				try {
					date = Temporal.PlainDate.from(dateInput);
				} catch {
					date = Temporal.PlainDateTime.from(dateInput);
				}
			} else if (dateInput instanceof Date) {
				date = Temporal.Instant.fromEpochMilliseconds(dateInput.getTime()).toZonedDateTimeISO(
					Temporal.Now.timeZoneId(),
				);
			} else if (dateInput instanceof Temporal.Instant) {
				date = dateInput.toZonedDateTimeISO(Temporal.Now.timeZoneId());
			} else {
				date = dateInput;
			}

			return date.toLocaleString(locale, options);
		} catch (error) {
			useLogger("Invalid date input:", error, "error");
			throw new Error(`Invalid date input: ${dateInput}`);
		}
	}

	/**
	 * Returns today's date as an ISO date string.
	 *
	 * @returns The current date in `YYYY-MM-DD` format.
	 *
	 * @example
	 * ```ts
	 * useNow(); // "2024-06-15"
	 * ```
	 */
	useNow(): string {
		return Temporal.Now.plainDateISO().toString();
	}

	/**
	 * Returns the current date and time as an ISO string (no timezone offset).
	 *
	 * @returns The current date-time in `YYYY-MM-DDTHH:MM:SS` format.
	 *
	 * @example
	 * ```ts
	 * useNowDateTime(); // "2024-06-15T14:30:00"
	 * ```
	 */
	useNowDateTime(): string {
		return Temporal.Now.plainDateTimeISO().toString();
	}

	/**
	 * Adds a number of days to a date.
	 *
	 * @param date - Base date (ISO string or `PlainDate`).
	 * @param days - Number of days to add (can be negative).
	 * @returns The resulting date as an ISO string.
	 *
	 * @example
	 * ```ts
	 * useAddDays("2024-01-01", 10); // "2024-01-11"
	 * ```
	 */
	useAddDays(date: string | Temporal.PlainDate, days: number): string {
		return this.toPlainDate(date).add({ days }).toString();
	}

	/**
	 * Subtracts a number of days from a date.
	 *
	 * @param date - Base date (ISO string or `PlainDate`).
	 * @param days - Number of days to subtract.
	 * @returns The resulting date as an ISO string.
	 *
	 * @example
	 * ```ts
	 * useSubtractDays("2024-01-11", 10); // "2024-01-01"
	 * ```
	 */
	useSubtractDays(date: string | Temporal.PlainDate, days: number): string {
		return this.toPlainDate(date).subtract({ days }).toString();
	}

	/**
	 * Checks whether two dates are equal.
	 *
	 * @param date1 - First date (ISO string or `PlainDate`).
	 * @param date2 - Second date (ISO string or `PlainDate`).
	 * @returns `true` if the dates represent the same day.
	 *
	 * @example
	 * ```ts
	 * useIsEqual("2024-06-15", "2024-06-15"); // true
	 * useIsEqual("2024-06-15", "2024-06-16"); // false
	 * ```
	 */
	useIsEqual(date1: string | Temporal.PlainDate, date2: string | Temporal.PlainDate): boolean {
		return Temporal.PlainDate.compare(this.toPlainDate(date1), this.toPlainDate(date2)) === 0;
	}

	/**
	 * Checks whether `date1` is before `date2`.
	 *
	 * @param date1 - First date (ISO string or `PlainDate`).
	 * @param date2 - Second date (ISO string or `PlainDate`).
	 * @returns `true` if `date1` is strictly before `date2`.
	 *
	 * @example
	 * ```ts
	 * useIsBefore("2024-01-01", "2024-06-15"); // true
	 * useIsBefore("2024-06-15", "2024-06-15"); // false
	 * ```
	 */
	useIsBefore(date1: string | Temporal.PlainDate, date2: string | Temporal.PlainDate): boolean {
		return Temporal.PlainDate.compare(this.toPlainDate(date1), this.toPlainDate(date2)) < 0;
	}

	/**
	 * Checks whether `date1` is after `date2`.
	 *
	 * @param date1 - First date (ISO string or `PlainDate`).
	 * @param date2 - Second date (ISO string or `PlainDate`).
	 * @returns `true` if `date1` is strictly after `date2`.
	 *
	 * @example
	 * ```ts
	 * useIsAfter("2024-06-15", "2024-01-01"); // true
	 * useIsAfter("2024-06-15", "2024-06-15"); // false
	 * ```
	 */
	useIsAfter(date1: string | Temporal.PlainDate, date2: string | Temporal.PlainDate): boolean {
		return Temporal.PlainDate.compare(this.toPlainDate(date1), this.toPlainDate(date2)) > 0;
	}

	/**
	 * Returns the first day of the month for a given date.
	 *
	 * @param date - Base date (defaults to today).
	 * @returns The first day of the month as an ISO string.
	 *
	 * @example
	 * ```ts
	 * useFirstDayOfMonth("2024-06-15"); // "2024-06-01"
	 * ```
	 */
	useFirstDayOfMonth(date: string | Temporal.PlainDate = Temporal.Now.plainDateISO()): string {
		return this.toPlainDate(date).with({ day: 1 }).toString();
	}

	/**
	 * Returns the last day of the month for a given date.
	 *
	 * @param date - Base date (defaults to today).
	 * @returns The last day of the month as an ISO string.
	 *
	 * @example
	 * ```ts
	 * useLastDayOfMonth("2024-02-10"); // "2024-02-29" (leap year)
	 * useLastDayOfMonth("2024-06-15"); // "2024-06-30"
	 * ```
	 */
	useLastDayOfMonth(date: string | Temporal.PlainDate = Temporal.Now.plainDateISO()): string {
		return this.toPlainDate(date)
			.add({ months: 1 })
			.with({ day: 1 })
			.subtract({ days: 1 })
			.toString();
	}
}

/* -------------------------------------------------------------------------- */
/* Wrappers                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Returns the whole number of `unit`s between two dates. Signed, never
 * fractional, and defaulting to `days`.
 *
 * @example
 * ```ts
 * useDateBetween("2020-01-01", "2022-04-16");           // 836
 * useDateBetween("2020-01-01", "2022-04-16", "months"); // 27
 * useDateBetween(issued, useNow(), "days");            // age in days
 * ```
 */
export function useDateBetween(
	start: TemporalInput,
	end: TemporalInput,
	unit: DateUnit = "days",
): number {
	return DatesService.getInstance().useDateBetween(start, end, unit);
}

/**
 * Returns the balanced breakdown between two dates as a `Temporal.Duration`.
 *
 * @example
 * ```ts
 * const span = useDurationBetween("2020-01-01", "2022-04-16");
 * span.years; // 2
 * span.days;  // 15
 * ```
 */
export function useDurationBetween(start: TemporalInput, end: TemporalInput): Temporal.Duration {
	return DatesService.getInstance().useDurationBetween(start, end);
}

/**
 * Returns the date a given number of units away, with calendar semantics.
 *
 * @example
 * ```ts
 * useDateAdd("2026-01-31", 1, "months");  // "2026-02-28"
 * useDateAdd("2026-01-01", 2, "quarters"); // "2026-07-01"
 * ```
 */
export function useDateAdd(date: TemporalInput, amount: number, unit: DateUnit): string {
	return DatesService.getInstance().useDateAdd(date, amount, unit);
}

/**
 * Subtracts units from a date, with calendar semantics.
 *
 * @example
 * ```ts
 * useDateSubtract(useNow(), 30, "days");
 * ```
 */
export function useDateSubtract(date: TemporalInput, amount: number, unit: DateUnit): string {
	return DatesService.getInstance().useDateSubtract(date, amount, unit);
}

/**
 * Returns whether the first date comes before, after, or at the same time as
 * the second.
 *
 * @example
 * ```ts
 * useDateOrder(deadline, useNow()); // "before"
 * ```
 */
export function useDateOrder(date1: TemporalInput, date2: TemporalInput): DateOrder {
	return DatesService.getInstance().useDateOrder(date1, date2);
}

/**
 * Formats a date input into a localised string using `Intl.DateTimeFormat`.
 *
 * @param dateInput - The value to format.
 * @param locale - BCP 47 locale tag (defaults to `"en"`).
 * @param options - `Intl.DateTimeFormatOptions` (defaults to `{}`).
 * @returns The formatted date string.
 *
 * @example
 * ```ts
 * useFormat("2024-06-15");
 * ```
 */
export function useFormat(
	dateInput: TemporalInput,
	locale: Locale = "en",
	options: Intl.DateTimeFormatOptions = {},
): string {
	return DatesService.getInstance().useFormat(dateInput, locale, options);
}

/**
 * Returns today's date as an ISO date string.
 *
 * @returns The current date in `YYYY-MM-DD` format.
 *
 * @example
 * ```ts
 * useNow(); // "2024-06-15"
 * ```
 */
export function useNow(): string {
	return DatesService.getInstance().useNow();
}

/**
 * Returns the current date and time as an ISO string (no timezone offset).
 *
 * @returns The current date-time in `YYYY-MM-DDTHH:MM:SS` format.
 *
 * @example
 * ```ts
 * useNowDateTime(); // "2024-06-15T14:30:00"
 * ```
 */
export function useNowDateTime(): string {
	return DatesService.getInstance().useNowDateTime();
}

/**
 * Adds a number of days to a date.
 *
 * @param date - Base date (ISO string or `PlainDate`).
 * @param days - Number of days to add (can be negative).
 * @returns The resulting date as an ISO string.
 *
 * @example
 * ```ts
 * useAddDays("2024-01-01", 10); // "2024-01-11"
 * ```
 */
export function useAddDays(date: string | Temporal.PlainDate, days: number): string {
	return DatesService.getInstance().useAddDays(date, days);
}

/**
 * Subtracts a number of days from a date.
 *
 * @param date - Base date (ISO string or `PlainDate`).
 * @param days - Number of days to subtract.
 * @returns The resulting date as an ISO string.
 *
 * @example
 * ```ts
 * useSubtractDays("2024-01-11", 10); // "2024-01-01"
 * ```
 */
export function useSubtractDays(date: string | Temporal.PlainDate, days: number): string {
	return DatesService.getInstance().useSubtractDays(date, days);
}

/**
 * Checks whether two dates are equal.
 *
 * @param date1 - First date (ISO string or `PlainDate`).
 * @param date2 - Second date (ISO string or `PlainDate`).
 * @returns `true` if the dates represent the same day.
 *
 * @example
 * ```ts
 * useIsEqual("2024-06-15", "2024-06-15"); // true
 * ```
 */
export function useIsEqual(
	date1: string | Temporal.PlainDate,
	date2: string | Temporal.PlainDate,
): boolean {
	return DatesService.getInstance().useIsEqual(date1, date2);
}

/**
 * Checks whether `date1` is before `date2`.
 *
 * @param date1 - First date (ISO string or `PlainDate`).
 * @param date2 - Second date (ISO string or `PlainDate`).
 * @returns `true` if `date1` is strictly before `date2`.
 *
 * @example
 * ```ts
 * useIsBefore("2024-01-01", "2024-06-15"); // true
 * ```
 */
export function useIsBefore(
	date1: string | Temporal.PlainDate,
	date2: string | Temporal.PlainDate,
): boolean {
	return DatesService.getInstance().useIsBefore(date1, date2);
}

/**
 * Checks whether `date1` is after `date2`.
 *
 * @param date1 - First date (ISO string or `PlainDate`).
 * @param date2 - Second date (ISO string or `PlainDate`).
 * @returns `true` if `date1` is strictly after `date2`.
 *
 * @example
 * ```ts
 * useIsAfter("2024-06-15", "2024-01-01"); // true
 * ```
 */
export function useIsAfter(
	date1: string | Temporal.PlainDate,
	date2: string | Temporal.PlainDate,
): boolean {
	return DatesService.getInstance().useIsAfter(date1, date2);
}

/**
 * Returns the first day of the month for a given date.
 *
 * @param date - Base date (defaults to today).
 * @returns The first day of the month as an ISO string.
 *
 * @example
 * ```ts
 * useFirstDayOfMonth("2024-06-15"); // "2024-06-01"
 * ```
 */
export function useFirstDayOfMonth(
	date: string | Temporal.PlainDate = Temporal.Now.plainDateISO(),
): string {
	return DatesService.getInstance().useFirstDayOfMonth(date);
}

/**
 * Returns the last day of the month for a given date.
 *
 * @param date - Base date (defaults to today).
 * @returns The last day of the month as an ISO string.
 *
 * @example
 * ```ts
 * useLastDayOfMonth("2024-02-10"); // "2024-02-29"
 * ```
 */
export function useLastDayOfMonth(
	date: string | Temporal.PlainDate = Temporal.Now.plainDateISO(),
): string {
	return DatesService.getInstance().useLastDayOfMonth(date);
}

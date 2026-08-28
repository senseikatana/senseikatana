// services/dates.service.ts
import { Temporal } from "@js-temporal/polyfill";
import type { Locale, TemporalInput } from "../../types";
import { LOGGER } from "../logs/logger.service";

export class DatesService {
	private constructor() {}

	// Calcula diferencia entre dos fechas
	static diff(
		start: string | Temporal.PlainDate,
		end: string | Temporal.PlainDate,
	): string {
		const startDate = typeof start === "string" ? Temporal.PlainDate.from(start) : start;
		const endDate = typeof end === "string" ? Temporal.PlainDate.from(end) : end;
		const duration = startDate.until(endDate, { largestUnit: "year" });

		return `${duration.years} años, ${duration.months} meses y ${duration.days} días`;
	}

	// Formatea fechas con Temporal
	static format(
		dateInput: TemporalInput,
		locale: Locale = "en-US",
		options: Intl.DateTimeFormatOptions = {},
	): string {
		let date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime;

		try {
			if (typeof dateInput === "number") {
				date = Temporal.Instant.fromEpochMilliseconds(dateInput).toZonedDateTimeISO(
					Temporal.Now.timeZoneId(),
				);
			} else if (typeof dateInput === "string") {
				// Intenta parsear como fecha simple primero
				try {
					date = Temporal.PlainDate.from(dateInput);
				} catch {
					// Si falla, intenta con datetime
					date = Temporal.PlainDateTime.from(dateInput);
				}
			} else if (dateInput instanceof Date) {
				// Convierte Date nativo a Temporal
				date = Temporal.Instant.fromEpochMilliseconds(dateInput.getTime()).toZonedDateTimeISO(
					Temporal.Now.timeZoneId(),
				);
			} else {
				date = dateInput;
			}

			return date.toLocaleString(locale, options);
		} catch (error) {
			LOGGER("Error formateando fecha:", error, "error");
			throw new Error(`Invalid date input: ${dateInput}`);
		}
	}

	// Fecha actual en formato ISO
	static now(): string {
		return Temporal.Now.plainDateISO().toString();
	}

	// Fecha y hora actual
	static nowDateTime(): string {
		return Temporal.Now.plainDateTimeISO().toString();
	}

	// Agrega días a una fecha
	static addDays(date: string | Temporal.PlainDate, days: number): string {
		const plainDate = typeof date === "string" ? Temporal.PlainDate.from(date) : date;
		return plainDate.add({ days }).toString();
	}

	// Resta días a una fecha
	static subtractDays(date: string | Temporal.PlainDate, days: number): string {
		const plainDate = typeof date === "string" ? Temporal.PlainDate.from(date) : date;
		return plainDate.subtract({ days }).toString();
	}

	// Compara si dos fechas son iguales
	static isEqual(
		date1: string | Temporal.PlainDate,
		date2: string | Temporal.PlainDate,
	): boolean {
		const d1 = typeof date1 === "string" ? Temporal.PlainDate.from(date1) : date1;
		const d2 = typeof date2 === "string" ? Temporal.PlainDate.from(date2) : date2;
		return Temporal.PlainDate.compare(d1, d2) === 0;
	}

	// Compara si una fecha es anterior a otra
	static isBefore(
		date1: string | Temporal.PlainDate,
		date2: string | Temporal.PlainDate,
	): boolean {
		const d1 = typeof date1 === "string" ? Temporal.PlainDate.from(date1) : date1;
		const d2 = typeof date2 === "string" ? Temporal.PlainDate.from(date2) : date2;
		return Temporal.PlainDate.compare(d1, d2) < 0;
	}

	// Compara si una fecha es posterior a otra
	static isAfter(
		date1: string | Temporal.PlainDate,
		date2: string | Temporal.PlainDate,
	): boolean {
		const d1 = typeof date1 === "string" ? Temporal.PlainDate.from(date1) : date1;
		const d2 = typeof date2 === "string" ? Temporal.PlainDate.from(date2) : date2;
		return Temporal.PlainDate.compare(d1, d2) > 0;
	}

	// Obtiene el primer día del mes
	static firstDayOfMonth(date: string | Temporal.PlainDate = Temporal.Now.plainDateISO()): string {
		const plainDate = typeof date === "string" ? Temporal.PlainDate.from(date) : date;
		return plainDate.with({ day: 1 }).toString();
	}

	// Obtiene el último día del mes
	static lastDayOfMonth(date: string | Temporal.PlainDate = Temporal.Now.plainDateISO()): string {
		const plainDate = typeof date === "string" ? Temporal.PlainDate.from(date) : date;
		const nextMonth = plainDate.add({ months: 1 }).with({ day: 1 });
		return nextMonth.subtract({ days: 1 }).toString();
	}
}

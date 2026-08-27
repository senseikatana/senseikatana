import type { Temporal } from "@js-temporal/polyfill";

export type Symbol = "€" | "$";
export type Locale = "en-US" | "es-ES" | "ja-JP" | "es-MX";
export type Currency = "EUR" | "USD" | "JPY" | "MXN" | "CAD";
export type TemporalInput =
	| string
	| number
	| Temporal.PlainDate
	| Temporal.ZonedDateTime
	| Temporal.PlainDateTime;
export type DateFormatOptions = {
	year: "numeric";
	month: "long";
	day: "numeric";
};

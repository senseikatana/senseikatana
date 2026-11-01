import { z } from "zod";

import { AiToolCallSchema } from "./ai.schema.js";
import { LocaleSchema } from "./common.schema.js";

/** Represents a geographic position with latitude, longitude and accuracy. */
export const GeoPositionSchema = z.object({
	lat: z.number(),
	lng: z.number(),
	accuracy: z.number(),
});

/** Supported ISO currency codes. */
export const CurrencySchema = z.enum([
	// Majors — the most traded pairs.
	"USD",
	"EUR",
	"GBP",
	"JPY",
	"CHF",
	"CAD",
	"AUD",
	"NZD",
	// Americas.
	"MXN",
	"BRL",
	"ARS",
	"COP",
	"CLP",
	// Europe, non-euro.
	"SEK",
	"NOK",
	"DKK",
	"PLN",
	"CZK",
	"HUF",
	"RON",
	"TRY",
	"ISK",
	// Asia-Pacific & Middle East.
	"CNY",
	"HKD",
	"SGD",
	"INR",
	"KRW",
	"THB",
	"IDR",
	"MYR",
	"PHP",
	"ILS",
	// Africa.
	"ZAR",
]);

/** Options for currency formatting. */
export const CurrencyFormatOptionsSchema = z.object({
	amount: z.number(),
	currency: CurrencySchema.optional(),
	/**
	 * Tax rate: percentage when `> 1` (e.g. `21` → 21%), or decimal fraction
	 * when in `(0, 1]` (e.g. `0.21` → 21%). Prefer a fraction for rates ≤ 1%.
	 */
	taxes: z.number().optional(),
	locale: LocaleSchema.optional(),
	/**
	 * Exact number of fraction digits in the output. Omit it to keep each
	 * currency's own digits as `Intl` defines them (`"¥100"`, `"$1.00"`);
	 * pass `2` to pin exactly two decimals (`"¥100.00"`).
	 */
	digits: z.number().int().nonnegative().optional(),
});

/** Options for a currency conversion between two ISO currencies. */
export const CurrencyConvertOptionsSchema = z.object({
	/** Amount to convert, in units of `from`. */
	amount: z.number(),
	/** Source currency. */
	from: CurrencySchema,
	/** Target currency. */
	to: CurrencySchema,
});

/** A dated snapshot of exchange rates quoted against one base currency. */
export const CurrencyRateSnapshotSchema = z.object({
	/** Base currency the rates are quoted against. */
	base: CurrencySchema,
	/** ISO date (`YYYY-MM-DD`) the rates belong to. */
	date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
	/**
	 * Quote currency → units of quote per 1 unit of `base`. Keys are the source's
	 * own vocabulary (loose on purpose: providers know currencies this kit does
	 * not, and an unknown key must not invalidate the snapshot).
	 */
	rates: z.record(z.string(), z.number()),
});

/** Result of a conversion: the math plus the rate and date it came from. */
export const CurrencyConversionSchema = z.object({
	/** Amount given to the conversion, echoed back. */
	amount: z.number(),
	/** Source currency. */
	from: CurrencySchema,
	/** Target currency. */
	to: CurrencySchema,
	/** Units of `to` per 1 unit of `from` on `date`. Full source precision. */
	rate: z.number(),
	/**
	 * `amount * rate` rounded to exactly 2 decimals (money, symmetric
	 * half-expand). The rate keeps its precision; the amount is what you settle.
	 */
	converted: z.number(),
	/** ISO date (`YYYY-MM-DD`) the rate belongs to. */
	date: z.string(),
});

/** Options for sale price arithmetic. */
export const SalePriceOptionsSchema = z.object({
	/** Regular price, before the discount. */
	price: z.number(),
	/**
	 * Discount rate: percentage when `> 1` (e.g. `40` → 40%), or decimal
	 * fraction when in `(0, 1]` (e.g. `0.4` → 40%). Same convention as `taxes`.
	 */
	discount: z.number(),
});

/** Options for plain number formatting. */
export const NumberFormatOptionsSchema = z.object({
	locale: LocaleSchema.optional(),
	digits: z.number().int().nonnegative().optional(),
});

/** Date format parts (subset of `Intl.DateTimeFormatOptions`). */
export const AppDateFormatOptionsSchema = z.object({
	year: z.enum(["numeric", "2-digit"]).optional(),
	month: z.enum(["numeric", "2-digit", "long", "short", "narrow"]).optional(),
	day: z.enum(["numeric", "2-digit"]).optional(),
});

/**
 * Granularity of a date calculation, matching Notion's formula vocabulary.
 *
 * Quarters are included because a calendar quarter is the unit a business
 * actually reports in, and it is exactly three months — no extra calendar
 * concept needed. Ordered coarsest to finest so a sorted union stays readable.
 */
export const DateUnitSchema = z.enum([
	"years",
	"quarters",
	"months",
	"weeks",
	"days",
	"hours",
	"minutes",
]);

/** Relative ordering of two dates, matching Notion's `dateOrder()`. */
export const DateOrderSchema = z.enum(["before", "after", "same"]);

/** Options for number formatting in geometry calculations. */
export const GeometryFormatOptionsSchema = z.object({
	locale: z.string().optional(),
	digits: z.number().int().nonnegative().optional(),
	unit: z.string().optional(),
});

/** Represents viewport dimensions. */
export const ViewportSizeSchema = z.object({
	width: z.number(),
	height: z.number(),
});

/** Represents scroll position. */
export const ScrollPositionSchema = z.object({
	x: z.number(),
	y: z.number(),
});

/** Internal registry entry for lazy loading configurations. */
export const LazyLoaderEntrySchema = z.object({
	selector: z.string().min(1),
	observerKey: z.string().min(1),
});

/** Safe error returned on non-2xx or network failures (AI boundary). */
export const AiErrorSchema = z.object({
	message: z.string(),
	status: z.number(),
	details: z.unknown().optional(),
});

/** One round of tool execution inside the agent loop. */
export const AgentStepSchema = z.object({
	toolCalls: z.array(AiToolCallSchema),
	toolResults: z.array(z.unknown()),
});

/** Payload returned by a successful `useRunAgent` call. */
export const AgentDataSchema = z.object({
	finalMessage: z.string(),
	steps: z.array(AgentStepSchema),
});

/** Payload returned by a successful assistant reply. */
export const AssistantReplySchema = z.object({
	reply: z.string(),
	sessionId: z.string().min(1),
});

/** A single field-level validation message keyed by field name. */
export const FieldErrorsSchema = z.record(z.string(), z.string());

/** Minimal issue shape (`error.issues` entries). */
export const ValidationIssueSchema = z.object({
	path: z.array(z.union([z.string(), z.number()])),
	message: z.string(),
});

/** Demo product shape (Express adapter). */
export const ProductTypeSchema = z.object({
	id: z.number(),
	name: z.string(),
	price: z.number(),
});

/** Error shape for Astro content operations. */
export const AstroServiceErrorSchema = z.object({
	message: z.string(),
	collectionName: z.string().optional(),
	details: z.unknown().optional(),
});

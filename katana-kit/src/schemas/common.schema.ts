import { z } from "zod";

/** Native console methods used as log levels. */
export const LogLevelSchema = z.enum(["log", "warn", "error"]);

/** HTTP verbs supported by the fetch facade. */
export const HttpMethodSchema = z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]);

/** Storage backends (Web Storage API). */
export const StorageTargetSchema = z.enum(["localStorage", "sessionStorage"]);

/** Locales with first-class formatting support. */
export const LocaleSchema = z.enum(["en", "es", "fr", "de", "it", "pt", "ja", "zh"]);

/** Color scheme modes. */
export const ThemeModeSchema = z.enum(["light", "dark", "system"]);

/** Serialized error shape. */
export const SerializedErrorSchema = z.object({
	message: z.string(),
	code: z.number(),
});

/** Safe error returned on non-2xx, network or validation failures. */
export const ApiErrorSchema = z.object({
	message: z.string(),
	status: z.number(),
	details: z.unknown().optional(),
});

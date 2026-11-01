import type { z } from "zod";

import type { FetchResult } from "@/types/index.js";

/**
 * ValidationService - Singleton para validaciones.
 *
 * Aplica el patrón Singleton: una única instancia que centraliza la
 * validación de datos desconocidos (respuestas de API, configs, input de
 * usuario) contra esquemas Zod devolviendo Safe Results en vez de lanzar
 * excepciones. Puro y sin I/O, seguro para SSR.
 */
export class ValidationService {
	private static instance: ValidationService;

	/**
	 * Constructor privado - enforce singleton.
	 */
	private constructor() {}

	/**
	 * Obtiene la instancia única del ValidationService (Singleton).
	 *
	 * @returns La instancia única de {@link ValidationService}.
	 *
	 * @example
	 * ```ts
	 * const validator = ValidationService.getInstance();
	 * validator.useValidate(SmartVideoOptionsSchema, raw);
	 * ```
	 */
	static getInstance(): ValidationService {
		if (!ValidationService.instance) {
			ValidationService.instance = new ValidationService();
		}
		return ValidationService.instance;
	}

	/**
	 * Validates unknown data (API responses, configs, user input) against a
	 * Zod schema and returns a Safe Result instead of throwing.
	 * Framework-agnostic and pure: no I/O, SSR-safe.
	 *
	 * @typeParam T - The validated output type (`z.infer` of the schema).
	 * @param schema - Any Zod schema.
	 * @param data - Unknown input to validate.
	 * @returns `FetchResult<T>` with typed data or a `Validation Error`.
	 *
	 * @example
	 * ```ts
	 * import { SmartVideoOptionsSchema } from "katanakit-js/schemas";
	 *
	 * const result = useValidate(SmartVideoOptionsSchema, JSON.parse(raw));
	 * if (result.ok) useBuildVideoEmbed(result.data);
	 * ```
	 */
	useValidate<T>(schema: z.ZodType<T>, data: unknown): FetchResult<T> {
		const parsed = schema.safeParse(data);
		if (parsed.success) {
			return { data: parsed.data, error: null, url: "", status: 200, ok: true };
		}
		const details = parsed.error.issues.map((issue) => ({
			path: issue.path.join("."),
			message: issue.message,
		}));
		const summary = details.map((d) => (d.path ? `${d.path}: ${d.message}` : d.message)).join("; ");
		return {
			data: null,
			error: {
				message: `Validation Error: ${summary || "invalid data"}`,
				status: 400,
				details,
			},
			url: "",
			status: 400,
			ok: false,
		};
	}
}

/**
 * Validates unknown data against a Zod schema and returns a Safe Result.
 * Wrapper sobre {@link ValidationService} (backward compatibility).
 *
 * @typeParam T - The validated output type (`z.infer` of the schema).
 * @param schema - Any Zod schema.
 * @param data - Unknown input to validate.
 * @returns `FetchResult<T>` with typed data or a `Validation Error`.
 *
 * @example
 * ```ts
 * import { SmartVideoOptionsSchema } from "katanakit-js/schemas";
 *
 * const result = useValidate(SmartVideoOptionsSchema, JSON.parse(raw));
 * if (result.ok) useBuildVideoEmbed(result.data);
 * ```
 */
export function useValidate<T>(schema: z.ZodType<T>, data: unknown): FetchResult<T> {
	return ValidationService.getInstance().useValidate(schema, data);
}

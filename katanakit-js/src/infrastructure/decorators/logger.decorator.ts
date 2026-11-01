import { useLogger } from "@/core/services/logger.service.js";
import type { LogLevel } from "@/types/index.js";

/**
 * LoggerDecorator - Decorator Pattern para trazado de llamadas.
 *
 * Envuelve una función (sync o async) y registra cada invocación con sus
 * argumentos, el resultado y la duración. No modifica la función original:
 * el logging se añade en tiempo de composición (Open/Closed).
 *
 * Nota: el nombre usa mayúscula inicial porque es un decorador composible,
 * no una función utilitaria (`use*`) del API pública.
 *
 * @typeParam T - Tipo de la función envuelta.
 * @param fn - La función a decorar.
 * @param label - Nombre legible que aparece en los logs (default: `fn.name`).
 * @param level - Nivel de log para el resultado (default: `"log"`).
 * @returns La función decorada con logging.
 *
 * @example
 * ```ts
 * import { LoggerDecorator } from "katanakit-js";
 *
 * const traced = LoggerDecorator(fetchUser, "fetchUser");
 * await traced(1);
 * // [fetchUser] start { args: [1] }
 * // [fetchUser] ok (12ms) { result: {...} }
 * ```
 *
 * @example Composición
 * ```ts
 * const robust = RetryDecorator(LoggerDecorator(flakyRequest, "flaky"), 2);
 * ```
 *
 * @remarks **Security**: arguments and results are logged verbatim. Do NOT
 * decorate functions that receive secrets (API keys, tokens, passwords) —
 * wrap a redacting adapter instead, or strip sensitive fields before calling.
 */
export function LoggerDecorator<T extends (...args: never[]) => unknown>(
	fn: T,
	label?: string,
	level: LogLevel = "log",
): T {
	const name = label ?? fn.name ?? "anonymous";

	const decorated = (...args: Parameters<T>): ReturnType<T> => {
		const startedAt = Date.now();
		useLogger(`${name} start`, { args }, level);

		try {
			const result = fn(...args);

			// Trace async results when the function returns a promise.
			if (result instanceof Promise) {
				return result
					.then((value) => {
						useLogger(`${name} ok (${Date.now() - startedAt}ms)`, { result: value }, level);
						return value;
					})
					.catch((error: unknown) => {
						useLogger(`${name} error (${Date.now() - startedAt}ms)`, { error }, "error");
						throw error;
					}) as ReturnType<T>;
			}

			useLogger(`${name} ok (${Date.now() - startedAt}ms)`, { result }, level);
			return result as ReturnType<T>;
		} catch (error) {
			useLogger(`${name} error (${Date.now() - startedAt}ms)`, { error }, "error");
			throw error;
		}
	};

	return decorated as T;
}

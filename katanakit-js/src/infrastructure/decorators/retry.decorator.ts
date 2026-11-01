/**
 * RetryDecorator - Decorator Pattern para reintentos.
 *
 * Envuelve una función asíncrona y la re-ejecuta cuando lanza, con un
 * intervalo fijo entre intentos. No modifica la función original: la
 * decoración se aplica en tiempo de composición (Open/Closed).
 *
 * Nota: el nombre usa mayúscula inicial porque es un decorador composible,
 * no una función utilitaria (`use*`) del API pública.
 *
 * @typeParam T - Tipo de la función envuelta.
 * @param fn - La función asíncrona a decorar.
 * @param retries - Número máximo de reintentos adicionales (default `3`).
 * @param delayMs - Intervalo entre intentos en ms (default `1000`).
 * @returns La función decorada con reintentos.
 *
 * @example
 * ```ts
 * import { RetryDecorator } from "katanakit-js";
 *
 * const fetchWithRetry = RetryDecorator(() => fetch("/api"), 3, 500);
 * // reintenta hasta 3 veces con 500ms de espera antes de propagar el error
 * await fetchWithRetry();
 * ```
 *
 * @example Composición con otros decoradores
 * ```ts
 * const robust = RetryDecorator(LoggerDecorator(flakyRequest), 2, 200);
 * ```
 *
 * @remarks Only **thrown** errors trigger a retry. KatanaKit's Safe Result
 * helpers (`useFetch`, `useGet`, ...) never throw — they return `{ ok: false }`
 * — so they are not retried as-is. To retry those, make `fn` throw on failure
 * (e.g. unwrap with `useSafeQueryFn`) or check `result.ok` inside `fn`.
 */
export function RetryDecorator<T extends (...args: never[]) => Promise<unknown>>(
	fn: T,
	retries = 3,
	delayMs = 1000,
): T {
	const decorated = async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
		let lastError: unknown;

		for (let attempt = 0; attempt <= retries; attempt++) {
			try {
				return (await fn(...args)) as Awaited<ReturnType<T>>;
			} catch (error) {
				lastError = error;
				if (attempt < retries && delayMs > 0) {
					await new Promise((resolve) => setTimeout(resolve, delayMs));
				}
			}
		}

		throw lastError;
	};

	return decorated as T;
}

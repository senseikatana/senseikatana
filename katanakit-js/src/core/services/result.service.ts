import type { ApiError, SafeResult } from "@/types/index.js";

import { useErrorNormalize } from "./error.service.js";

/**
 * ResultService — Singleton facade for Safe Result creation at service
 * boundaries.
 *
 * Applies the **Singleton** pattern (one shared instance via
 * {@link ResultService.getInstance}) and the **Facade** pattern: each public
 * method hides a `try/catch` behind one call that always resolves to the
 * `{ data, error, ok }` discriminated union from {@link SafeResult}. Nothing is
 * thrown and both error branches keep their exact shapes (`error.status = 0`
 * for parse failures), so consumers can narrow on `ok` without extra guards.
 *
 * Every public method uses the `use*` prefix per `CONTRIBUTING.md`; the module
 * level `use*` functions below are thin wrappers kept for call-site ergonomics.
 *
 * @example
 * ```ts
 * import { useAttempt } from "katanakit-js";
 *
 * const result = await useAttempt(() => sdk.insert("posts", row));
 * if (result.ok) console.log(result.data);
 * else console.error(result.error.message);
 * ```
 */
export class ResultService {
	private static instance: ResultService;

	/** Private constructor — enforce Singleton. */
	private constructor() {}

	/** Returns the shared instance (Singleton). */
	static getInstance(): ResultService {
		if (!ResultService.instance) {
			ResultService.instance = new ResultService();
		}
		return ResultService.instance;
	}

	/**
	 * Runs an operation (sync or async) and captures any throw as a Safe Result.
	 *
	 * The canonical replacement for ad-hoc `try/catch` at service boundaries: the
	 * mapper defaults to {@link useErrorNormalize}, so SDK errors, `Error`
	 * instances and plain strings all come back normalized.
	 *
	 * @typeParam T - Success value type.
	 * @param operation - The operation to run.
	 * @param mapError - Optional error mapper (default: `useErrorNormalize`).
	 * @returns `{ data, error, ok }` — never throws.
	 *
	 * @example
	 * ```ts
	 * import { useAttempt } from "katanakit-js";
	 *
	 * const result = await useAttempt(() => sdk.insert("posts", row));
	 * if (result.ok) console.log(result.data);
	 * else console.error(result.error.message);
	 * ```
	 */
	async useAttempt<T>(
		operation: () => T | Promise<T>,
		mapError: (error: unknown) => ApiError = useErrorNormalize,
	): Promise<SafeResult<T>> {
		try {
			return { data: await operation(), error: null, ok: true };
		} catch (error) {
			return { data: null, error: mapError(error), ok: false };
		}
	}

	/**
	 * Parses JSON without throwing; failures come back as a Safe Result.
	 *
	 * Consumers keep their own fallback policy (raw string, `null`, retry, …) by
	 * checking `ok` instead of nesting `try/catch`.
	 *
	 * @typeParam T - Expected parsed shape.
	 * @param text - Raw JSON text.
	 * @returns `{ data, error, ok }` with `error.status = 0` on parse failure.
	 *
	 * @example
	 * ```ts
	 * const parsed = useTryJsonParse<{ id: number }>(raw);
	 * return parsed.ok ? parsed.data : raw;
	 * ```
	 */
	useTryJsonParse<T = unknown>(text: string): SafeResult<T> {
		try {
			return { data: JSON.parse(text) as T, error: null, ok: true };
		} catch (error) {
			const raw = error instanceof Error ? error.message : "Invalid JSON";
			return {
				data: null,
				error: { message: raw.slice(0, 300), status: 0 },
				ok: false,
			};
		}
	}
}

/** Runs an operation and captures any throw as a Safe Result. See {@link ResultService.useAttempt}. */
export async function useAttempt<T>(
	operation: () => T | Promise<T>,
	mapError: (error: unknown) => ApiError = useErrorNormalize,
): Promise<SafeResult<T>> {
	return ResultService.getInstance().useAttempt<T>(operation, mapError);
}

/** Parses JSON without throwing. See {@link ResultService.useTryJsonParse}. */
export function useTryJsonParse<T = unknown>(text: string): SafeResult<T> {
	return ResultService.getInstance().useTryJsonParse<T>(text);
}

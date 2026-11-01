import type { ConfigData, ConfigMethodEntries } from "@/types/index.js";

/**
 * UtilsService - Singleton para utilidades genéricas.
 *
 * Aplica el patrón Singleton: una única instancia que centraliza utilidades
 * de arrays, objetos, tiempo y configuración. Puro, sin I/O, seguro para SSR.
 */
export class UtilsService {
	private static instance: UtilsService;

	/**
	 * Constructor privado - enforce singleton.
	 */
	private constructor() {}

	/**
	 * Obtiene la instancia única del UtilsService (Singleton).
	 *
	 * @returns La instancia única de {@link UtilsService}.
	 *
	 * @example
	 * ```ts
	 * const utils = UtilsService.getInstance();
	 * utils.useUnique([1, 2, 2, 3, 1]);
	 * ```
	 */
	static getInstance(): UtilsService {
		if (!UtilsService.instance) {
			UtilsService.instance = new UtilsService();
		}
		return UtilsService.instance;
	}

	/**
	 * Returns a new array with duplicate values removed, preserving first-seen order.
	 *
	 * @typeParam T - Element type.
	 * @param array - The input array.
	 * @returns A new array with unique values.
	 *
	 * @example
	 * ```ts
	 * useUnique([1, 2, 2, 3, 1]); // [1, 2, 3]
	 * useUnique(["a", "b", "a"]); // ["a", "b"]
	 * ```
	 */
	useUnique<T>(array: T[]): T[] {
		return [...new Set(array)];
	}

	/**
	 * Splits an array into chunks of the given size.
	 *
	 * @typeParam T - Element type.
	 * @param array - The input array.
	 * @param size - Number of elements per chunk (must be > 0).
	 * @returns An array of chunks.
	 * @throws {Error} If `size` is less than or equal to 0.
	 *
	 * @example
	 * ```ts
	 * useChunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
	 * useChunk(["a", "b", "c"], 1);  // [["a"], ["b"], ["c"]]
	 * ```
	 */
	useChunk<T>(array: T[], size: number): T[][] {
		if (size <= 0) throw new Error("Chunk size must be greater than 0");
		return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
			array.slice(i * size, i * size + size),
		);
	}

	/**
	 * Groups array items by a key property or key selector function.
	 *
	 * @typeParam T - Element type.
	 * @param array - The input array.
	 * @param key - A property name or a function that returns the group key.
	 * @returns An object mapping group keys to arrays of items.
	 *
	 * @example
	 * ```ts
	 * const items = [
	 *   { type: "fruit", name: "apple" },
	 *   { type: "veggie", name: "carrot" },
	 *   { type: "fruit", name: "banana" },
	 * ];
	 * useGroupBy(items, "type");
	 * // { fruit: [{ type: "fruit", name: "apple" }, { type: "fruit", name: "banana" }], veggie: [...] }
	 * ```
	 */
	useGroupBy<T>(array: T[], key: keyof T | ((item: T) => string)): Record<string, T[]> {
		return array.reduce(
			(acc, item) => {
				const groupKey: string = typeof key === "function" ? key(item) : String(item[key]);
				if (!acc[groupKey]) {
					acc[groupKey] = [];
				}
				acc[groupKey].push(item);
				return acc;
			},
			{} as Record<string, T[]>,
		);
	}

	/**
	 * Type guard that checks whether a value is a plain object (not null, not
	 * an array).
	 *
	 * @param item - The value to test.
	 * @returns `true` if the value is a plain `Record<string, unknown>`.
	 *
	 * @example
	 * ```ts
	 * useIsObject({ a: 1 });       // true
	 * useIsObject([1, 2]);          // false
	 * useIsObject(null);            // false
	 * ```
	 */
	useIsObject(item: unknown): item is Record<string, unknown> {
		return typeof item === "object" && item !== null && !Array.isArray(item);
	}

	/**
	 * Deep clones a value using `structuredClone` with a JSON fallback for
	 * environments that do not support it.
	 *
	 * @typeParam T - Value type.
	 * @param value - The value to clone.
	 * @returns A deep copy of the value.
	 *
	 * @example
	 * ```ts
	 * const original = { a: { b: 1 } };
	 * const copy = useDeepClone(original);
	 * copy.a.b = 2;
	 * original.a.b; // 1 (unchanged)
	 * ```
	 */
	useDeepClone<T>(value: T): T {
		if (typeof structuredClone === "function") {
			return structuredClone(value);
		}
		return JSON.parse(JSON.stringify(value)) as T;
	}

	/**
	 * Deep merges `source` into a shallow copy of `target`. Nested plain
	 * objects are merged recursively. Skips prototype-pollution keys
	 * (`__proto__`, `constructor`, `prototype`).
	 *
	 * @typeParam T - Target object type.
	 * @param target - The base object (not mutated).
	 * @param source - The object to merge in.
	 * @returns A new merged object.
	 *
	 * @example
	 * ```ts
	 * const base = { a: 1, b: { c: 2, d: 3 } };
	 * const override = { b: { c: 99, e: 4 }, f: 5 };
	 * useDeepMerge(base, override);
	 * // { a: 1, b: { c: 99, d: 3, e: 4 }, f: 5 }
	 * ```
	 */
	useDeepMerge<T extends Record<string, unknown>>(target: T, source: Record<string, unknown>): T {
		if (!target || !source) return { ...target };
		const output = { ...target } as Record<string, unknown>;
		const dangerousKeys = new Set(["__proto__", "constructor", "prototype"]);

		for (const key of Object.keys(source)) {
			if (dangerousKeys.has(key)) continue;

			const targetVal = target[key];
			const sourceVal = source[key];

			if (this.useIsObject(targetVal) && this.useIsObject(sourceVal)) {
				output[key] = this.useDeepMerge(targetVal, sourceVal);
			} else {
				output[key] = sourceVal;
			}
		}
		return output as T;
	}

	/**
	 * Picks the listed keys from an object into a new object.
	 *
	 * @typeParam T - Source object type.
	 * @typeParam K - Keys to pick.
	 * @param obj - The source object.
	 * @param keys - Array of keys to include.
	 * @returns A new object with only the picked keys.
	 *
	 * @example
	 * ```ts
	 * const user = { id: 1, name: "Alice", email: "a@b.com" };
	 * usePick(user, ["id", "name"]); // { id: 1, name: "Alice" }
	 * ```
	 */
	usePick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
		return keys.reduce(
			(acc, key) => {
				if (key in obj) acc[key] = obj[key];
				return acc;
			},
			{} as Pick<T, K>,
		);
	}

	/**
	 * Omits the listed keys from an object, returning a shallow copy without
	 * them. Shallow on purpose to avoid `structuredClone` failures on
	 * non-cloneable values.
	 *
	 * @typeParam T - Source object type.
	 * @typeParam K - Keys to omit.
	 * @param obj - The source object.
	 * @param keys - Array of keys to exclude.
	 * @returns A new object without the omitted keys.
	 *
	 * @example
	 * ```ts
	 * const user = { id: 1, name: "Alice", password: "secret" };
	 * useOmit(user, ["password"]); // { id: 1, name: "Alice" }
	 * ```
	 */
	useOmit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
		const omit = new Set(keys as readonly PropertyKey[]);
		const result: Record<string, unknown> = {};
		for (const key of Object.keys(obj as object)) {
			if (!omit.has(key)) {
				result[key] = (obj as Record<string, unknown>)[key];
			}
		}
		return result as Omit<T, K>;
	}

	/**
	 * Returns a promise that resolves after `ms` milliseconds.
	 *
	 * @param ms - Delay in milliseconds.
	 * @returns A promise that resolves after the delay.
	 *
	 * @example
	 * ```ts
	 * await useSleep(1000); // waits 1 second
	 * ```
	 */
	useSleep(ms: number): Promise<void> {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	/**
	 * Retries an async function with a fixed delay between attempts.
	 *
	 * @typeParam T - The resolved value type.
	 * @param fn - The async function to retry.
	 * @param retries - Maximum number of retries (defaults to `3`).
	 * @param delayMs - Delay between retries in milliseconds (defaults to `1000`).
	 * @returns The resolved value of `fn`.
	 * @throws The last error if all retries are exhausted.
	 *
	 * @example
	 * ```ts
	 * const data = await useRetry(() => fetch("/api").then(r => r.json()), 3, 500);
	 * ```
	 */
	async useRetry<T>(fn: () => Promise<T>, retries = 3, delayMs = 1000): Promise<T> {
		try {
			return await fn();
		} catch (error) {
			if (retries <= 0) throw error;
			await this.useSleep(delayMs);
			return this.useRetry(fn, retries - 1, delayMs);
		}
	}

	/**
	 * Copies text to the clipboard (browser only). Returns `false` on failure
	 * or in non-browser environments (SSR).
	 *
	 * @param text - The text to copy.
	 * @returns `true` if the text was copied, `false` otherwise.
	 *
	 * @example
	 * ```ts
	 * const ok = await useCopyToClipboard("Hello, world!");
	 * console.log(ok); // true (in a browser with clipboard API)
	 * ```
	 */
	async useCopyToClipboard(text: string): Promise<boolean> {
		if (typeof navigator === "undefined" || !navigator.clipboard) {
			return false;
		}
		try {
			await navigator.clipboard.writeText(text);
			return true;
		} catch {
			return false;
		}
	}

	/**
	 * Parses query parameters from a URL string into a plain object.
	 * Returns an empty object for invalid URLs.
	 *
	 * @param urlString - The URL to parse.
	 * @returns An object mapping parameter names to values.
	 *
	 * @example
	 * ```ts
	 * useGetUrlParams("https://example.com?q=hello&page=1");
	 * // { q: "hello", page: "1" }
	 * ```
	 */
	useGetUrlParams(urlString: string): Record<string, string> {
		try {
			const url = new URL(urlString);
			return Object.fromEntries(url.searchParams.entries());
		} catch {
			return {};
		}
	}

	/**
	 * Rounds a number (or numeric string) to the specified number of decimal
	 * places. Returns `0` for non-numeric input.
	 *
	 * @param value - The number or numeric string to round.
	 * @param decimals - Number of decimal places (defaults to `2`).
	 * @returns The rounded number.
	 *
	 * @example
	 * ```ts
	 * useRound(3.14159, 2);   // 3.14
	 * useRound("5.678", 1);   // 5.7
	 * ```
	 */
	useRound(value: string | number, decimals = 2): number {
		const num = typeof value === "string" ? Number.parseFloat(value) : value;
		if (Number.isNaN(num)) return 0;
		const factor = 10 ** decimals;
		return Math.round(num * factor) / factor;
	}

	/**
	 * Computes the arithmetic mean of an array of numbers. Returns `0` for an
	 * empty array.
	 *
	 * @param numbers - The input numbers.
	 * @returns The arithmetic mean.
	 *
	 * @example
	 * ```ts
	 * useAverage([1, 2, 3, 4, 5]); // 3
	 * useAverage([]);               // 0
	 * ```
	 */
	useAverage(numbers: number[]): number {
		if (numbers.length === 0) return 0;
		const sum = numbers.reduce((acc, n) => acc + n, 0);
		return sum / numbers.length;
	}

	/**
	 * Splits a `define*Config` literal into its config half (props and booleans)
	 * and its method half (values declared with `function`).
	 *
	 * Shared by every `define*Config` so they all read the same way: register
	 * `config`, then return `{ config, ...methods }` as a `ConfigFacade`.
	 *
	 * @typeParam T - The literal passed to a `define*Config` call.
	 * @param input - Object literal holding props, booleans and methods.
	 * @returns The config entries and the method entries, split apart.
	 *
	 * @example
	 * ```ts
	 * const { config, methods } = useSplitConfig({
	 *   token: "abc",
	 *   debug: true,
	 *   send: async function () {},
	 * });
	 * // config  → { token: "abc", debug: true }
	 * // methods → { send }
	 * ```
	 */
	useSplitConfig<T extends object>(
		input: T,
	): {
		config: ConfigData<T>;
		methods: ConfigMethodEntries<T>;
	} {
		const config: Record<string, unknown> = {};
		const methods: Record<string, unknown> = {};

		for (const [key, value] of Object.entries(input)) {
			if (typeof value === "function") methods[key] = value;
			else config[key] = value;
		}

		return {
			// The split is structural, so TS cannot relate either half back to `T`.
			config: config as ConfigData<T>,
			methods: methods as ConfigMethodEntries<T>,
		};
	}
}

/* -------------------------------------------------------------------------- */
/* Wrappers (backward compatibility)                                          */
/* -------------------------------------------------------------------------- */

/**
 * Returns a new array with duplicate values removed, preserving first-seen order.
 *
 * @example
 * ```ts
 * useUnique([1, 2, 2, 3, 1]); // [1, 2, 3]
 * ```
 */
export function useUnique<T>(array: T[]): T[] {
	return UtilsService.getInstance().useUnique(array);
}

/**
 * Splits an array into chunks of the given size.
 *
 * @example
 * ```ts
 * useChunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
 * ```
 */
export function useChunk<T>(array: T[], size: number): T[][] {
	return UtilsService.getInstance().useChunk(array, size);
}

/**
 * Groups array items by a key property or key selector function.
 *
 * @example
 * ```ts
 * useGroupBy(items, "type");
 * ```
 */
export function useGroupBy<T>(
	array: T[],
	key: keyof T | ((item: T) => string),
): Record<string, T[]> {
	return UtilsService.getInstance().useGroupBy(array, key);
}

/**
 * Type guard that checks whether a value is a plain object (not null, not an array).
 *
 * @example
 * ```ts
 * useIsObject({ a: 1 }); // true
 * ```
 */
export function useIsObject(item: unknown): item is Record<string, unknown> {
	return UtilsService.getInstance().useIsObject(item);
}

/**
 * Deep clones a value using `structuredClone` with a JSON fallback.
 *
 * @example
 * ```ts
 * const copy = useDeepClone(original);
 * ```
 */
export function useDeepClone<T>(value: T): T {
	return UtilsService.getInstance().useDeepClone(value);
}

/**
 * Deep merges `source` into a shallow copy of `target`.
 *
 * @example
 * ```ts
 * useDeepMerge(base, override);
 * ```
 */
export function useDeepMerge<T extends Record<string, unknown>>(
	target: T,
	source: Record<string, unknown>,
): T {
	return UtilsService.getInstance().useDeepMerge(target, source);
}

/**
 * Picks the listed keys from an object into a new object.
 *
 * @example
 * ```ts
 * usePick(user, ["id", "name"]);
 * ```
 */
export function usePick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
	return UtilsService.getInstance().usePick(obj, keys);
}

/**
 * Omits the listed keys from an object, returning a shallow copy without them.
 *
 * @example
 * ```ts
 * useOmit(user, ["password"]);
 * ```
 */
export function useOmit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
	return UtilsService.getInstance().useOmit(obj, keys);
}

/**
 * Returns a promise that resolves after `ms` milliseconds.
 *
 * @example
 * ```ts
 * await useSleep(1000);
 * ```
 */
export function useSleep(ms: number): Promise<void> {
	return UtilsService.getInstance().useSleep(ms);
}

/**
 * Retries an async function with a fixed delay between attempts.
 *
 * @example
 * ```ts
 * const data = await useRetry(() => fetch("/api"), 3, 500);
 * ```
 */
export async function useRetry<T>(fn: () => Promise<T>, retries = 3, delayMs = 1000): Promise<T> {
	return UtilsService.getInstance().useRetry(fn, retries, delayMs);
}

/**
 * Copies text to the clipboard (browser only).
 *
 * @example
 * ```ts
 * const ok = await useCopyToClipboard("Hello, world!");
 * ```
 */
export async function useCopyToClipboard(text: string): Promise<boolean> {
	return UtilsService.getInstance().useCopyToClipboard(text);
}

/**
 * Parses query parameters from a URL string into a plain object.
 *
 * @example
 * ```ts
 * useGetUrlParams("https://example.com?q=hello&page=1");
 * ```
 */
export function useGetUrlParams(urlString: string): Record<string, string> {
	return UtilsService.getInstance().useGetUrlParams(urlString);
}

/**
 * Rounds a number (or numeric string) to the specified number of decimal places.
 *
 * @example
 * ```ts
 * useRound(3.14159, 2); // 3.14
 * ```
 */
export function useRound(value: string | number, decimals = 2): number {
	return UtilsService.getInstance().useRound(value, decimals);
}

/**
 * Computes the arithmetic mean of an array of numbers.
 *
 * @example
 * ```ts
 * useAverage([1, 2, 3, 4, 5]); // 3
 * ```
 */
export function useAverage(numbers: number[]): number {
	return UtilsService.getInstance().useAverage(numbers);
}

/**
 * Splits a `define*Config` literal into its config half and its method half.
 *
 * @example
 * ```ts
 * const { config, methods } = useSplitConfig({ token: "abc", send: async function () {} });
 * ```
 */
export function useSplitConfig<T extends object>(
	input: T,
): {
	config: ConfigData<T>;
	methods: ConfigMethodEntries<T>;
} {
	return UtilsService.getInstance().useSplitConfig(input);
}

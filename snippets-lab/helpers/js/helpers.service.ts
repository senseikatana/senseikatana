// ============================================================
// TODO: ARRAYS HELPERS JS:
// ============================================================

// utils/array.utils.ts
export class ArrayUtils {
	private constructor() {}

	static unique<T>(array: T[]): T[] {
		return [...new Set(array)];
	}

	static flatten<T>(array: T[][]): T[] {
		return array.flat(Infinity) as T[];
	}

	static chunk<T>(array: T[], size: number): T[][] {
		if (size <= 0) throw new Error("Chunk size must be greater than 0");
		return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
			array.slice(i * size, i * size + size),
		);
	}

	// Usa Object.groupBy nativo si está disponible (ES2024)
	static groupBy<T>(array: T[], key: keyof T | ((item: T) => string)): Record<string, T[]> {
		if (typeof Object.groupBy === "function" && typeof key === "string") {
			return Object.groupBy(array, (item) => String(item[key as keyof T]));
		}

		return array.reduce(
			(acc, item) => {
				const groupKey = typeof key === "function" ? key(item) : String(item[key]);
				(acc[groupKey] ??= []).push(item);
				return acc;
			},
			{} as Record<string, T[]>,
		);
	}
}

// utils/object.utils.ts
export class ObjectUtils {
	private constructor() {}

	static isObject(item: unknown): item is Record<string, unknown> {
		return typeof item === "object" && item !== null && !Array.isArray(item);
	}

	static deepClone<T>(value: T): T {
		if (typeof structuredClone === "function") {
			return structuredClone(value);
		}
		return JSON.parse(JSON.stringify(value)) as T;
	}

	static deepMerge<T extends Record<string, unknown>>(
		target: T,
		source: Record<string, unknown>,
	): T {
		if (!target || !source) return { ...target };
		const output = { ...target } as Record<string, unknown>;

		for (const key of Object.keys(source)) {
			const targetVal = target[key];
			const sourceVal = source[key];

			if (this.isObject(targetVal) && this.isObject(sourceVal)) {
				output[key] = this.deepMerge(targetVal, sourceVal);
			} else {
				output[key] = sourceVal;
			}
		}

		return output as T;
	}

	static pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
		return keys.reduce(
			(acc, key) => {
				if (key in obj) acc[key] = obj[key];
				return acc;
			},
			{} as Pick<T, K>,
		);
	}

	static omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
		const result = this.deepClone(obj) as Record<string, unknown>;
		for (const key of keys) delete result[key as string];
		return result as Omit<T, K>;
	}

	static hasProperties<T extends object, K extends keyof T>(
		obj: T,
		...keys: K[]
	): obj is T & Record<K, NonNullable<T[K]>> {
		return keys.every((key) => obj[key] !== undefined && obj[key] !== null);
	}
}

// utils/async.utils.ts
export class AsyncUtils {
	private constructor() {}

	static sleep(ms: number): Promise<void> {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	static async retry<T>(
		fn: () => Promise<T>,
		retries: number = 3,
		delayMs: number = 1000,
	): Promise<T> {
		try {
			return await fn();
		} catch (error) {
			if (retries <= 0) throw error;
			await this.sleep(delayMs);
			return this.retry(fn, retries - 1, delayMs);
		}
	}
}

// utils/web.utils.ts
// import { LOGGER } from "../services/logger.service";

export class WebUtils {
	private constructor() {}

	static async copyToClipboard(text: string): Promise<boolean> {
		try {
			await navigator.clipboard.writeText(text);
			return true;
		} catch (error) {
			console.log("Clipboard error:", error, "error");
			return false;
		}
	}

	static parseUrl(urlString: string): URL | null {
		try {
			return new URL(urlString);
		} catch {
			return null;
		}
	}

	static getUrlParams(urlString: string): Record<string, string> {
		const url = this.parseUrl(urlString);
		if (!url) return {};
		return Object.fromEntries(url.searchParams.entries());
	}
}


// utils/math.utils.ts
export class MathUtils {
	private constructor() {}

	// Constantes
	static readonly PI = Math.PI;
	static readonly E = Math.E;

	// Operaciones básicas (wrappers útiles)
	static sum(values: number[]): number {
		return values.reduce((acc, n) => acc + n, 0);
	}

	static average(numbers: number[]): number {
		if (numbers.length === 0) return 0;
		return this.sum(numbers) / numbers.length;
	}

	static max(numbers: number[]): number {
		return Math.max(...numbers);
	}

	static min(numbers: number[]): number {
		return Math.min(...numbers);
	}

	// Operaciones avanzadas
	static sumProduct(arr1: number[], arr2: number[]): number {
		if (arr1.length !== arr2.length) {
			throw new Error("Arrays must have equal length");
		}
		return arr1.reduce((acc, val, i) => acc + val * (arr2[i] ?? 0), 0);
	}

	static round(value: string | number, decimals: number = 2): number {
		const num = typeof value === "string" ? parseFloat(value) : value;
		if (Number.isNaN(num)) return 0;
		const factor = 10 ** decimals;
		return Math.round(num * factor) / factor;
	}

	static randomInt(min: number, max: number): number {
		const minCeil = Math.ceil(min);
		const maxFloor = Math.floor(max);
		return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil;
	}

	// Operaciones estadísticas
	static median(numbers: number[]): number {
		const sorted = [...numbers].sort((a, b) => a - b);
		const mid = Math.floor(sorted.length / 2);
		return sorted.length % 2 !== 0
			? sorted[mid]
			: (sorted[mid - 1] + sorted[mid]) / 2;
	}

	static variance(numbers: number[]): number {
		const avg = this.average(numbers);
		const squaredDiffs = numbers.map((n) => Math.pow(n - avg, 2));
		return this.average(squaredDiffs);
	}

	static standardDeviation(numbers: number[]): number {
		return Math.sqrt(this.variance(numbers));
	}
}





// ============================================================
// TODO: USAGE DEMO 	
// ============================================================



// Arrays
ArrayUtils.unique([1, 2, 2, 3]);
ArrayUtils.chunk([1, 2, 3, 4, 5], 2);
ArrayUtils.groupBy(users, "role");

// Objects
const merged = ObjectUtils.deepMerge(target, source);
const picked = ObjectUtils.pick(user, ["id", "name"]);

// Async
await AsyncUtils.sleep(1000);
const data = await AsyncUtils.retry(() => fetch("/api").then(r => r.json()));

// Web
await WebUtils.copyToClipboard("Hola");
const params = WebUtils.getUrlParams(window.location.href);

// JSON
const json = JsonUtils.toJson({ a: 1 });
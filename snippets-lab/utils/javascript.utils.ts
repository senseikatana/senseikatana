export default class NATIVE {
	private static instance: NATIVE_API;

	private constructor() {
		// Constructor privado para forzar Singleton
	}

	static getInstance(): NATIVE_API {
		if (!NATIVE_API.instance) {
			NATIVE_API.instance = new NATIVE_API();
		}
		return NATIVE_API.instance;
	}

	DEEP_CLONE<T = StructuredSerializeOptions | undefined>(value: T): T {
		if (typeof structuredClone === "function") return structuredClone(value);
		return JSON.parse(JSON.stringify(value)) as T;
	}

	DEEP_MERGE<T extends Record<string, unknown>>(
		target: T,
		source: Record<string, unknown>,
	): T {
		if (!target || !source) return { ...target };
		const output: Record<string, unknown> = { ...target };

		Object.keys(source).forEach((key) => {
			const targetVal = target[key];
			const sourceVal = source[key];

			if (
				typeof targetVal === "object" &&
				targetVal !== null &&
				typeof sourceVal === "object" &&
				sourceVal !== null &&
				!Array.isArray(sourceVal)
			) {
				output[key] = this.DEEP_MERGE(
					targetVal as Record<string, unknown>,
					sourceVal as Record<string, unknown>,
				);
			} else {
				output[key] = sourceVal;
			}
		});

		return output as T;
	}

	HAS_PROPERTIES<T extends object, K extends keyof T>(
		obj: T,
		...keys: K[]
	): obj is T & Record<K, NonNullable<T[K]>> {
		return keys.every((key) => obj[key] !== undefined && obj[key] !== null);
	}

	IS_OBJECT(item: unknown): item is Record<string, unknown> {
		return typeof item === "object" && item !== null && !Array.isArray(item);
	}

	GROUP_BY<T extends Record<string, unknown>>(
		array: T[],
		key: keyof T,
	): Record<string, T[]> {
		return array.reduce(
			(acc, item) => {
				const groupKey = String(item[key]);
				acc[groupKey] = acc[groupKey] ?? [];
				acc[groupKey].push(item);
				return acc;
			},
			{} as Record<string, T[]>,
		);
	}
	TO_JSON(data: unknown, indent: number = 2): string {
		return JSON.stringify(data, null, indent);
	}
	FROM_JSON<T>(jsonString: string): T | null {
		try {
			return JSON.parse(jsonString) as T;
		} catch {
			return null;
		}
	}
	// ─── Arrays & Objects (Nativas ES2019+) ────────────────────────────
	UNIQUE<T>(array: T[]): T[] {
		return [...new Set(array)];
	}

	FLATTEN<T>(array: T[][]): T[] {
		return array.flat(Infinity) as T[];
	}
	CHUNK<T>(array: T[], size: number): T[][] {
		return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
			array.slice(i * size, i * size + size),
		);
	}
	PICK<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
		return keys.reduce(
			(acc, key) => {
				if (key in obj) acc[key] = obj[key];
				return acc;
			},
			{} as Pick<T, K>,
		);
	}
	OMIT<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
		const result = DEEP_CLONE(obj);
		keys.forEach((key) => delete result[key]);
		return result as Omit<T, K>;
	}
	// ─── Promises & Time (Nativas Web APIs) ────────────────────────────
	async SLEEP(ms: number): Promise<void> {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
	async RETRY<T>(
		fn: () => Promise<T>,
		retries: number = 3,
		delayMs: number = 1000,
	): Promise<T> {
		try {
			return await fn();
		} catch (error) {
			if (retries <= 0) throw error;
			await SLEEP(delayMs);
			return RETRY(fn, retries - 1, delayMs);
		}
	}
	// ─── Clipboard API ─────────────────────────────────────────────────
	async COPY_TO_CLIPBOARD(text: string): Promise<boolean> {
		try {
			await navigator.clipboard.writeText(text);
			return true;
		} catch (error) {
			console.error("Clipboard error:", error);
			return false;
		}
	}
	// ─── URL API ───────────────────────────────────────────────────────
	PARSE_URL(urlString: string): URL | null {
		try {
			return new URL(urlString);
		} catch {
			return null;
		}
	}
	GET_URL_PARAMS(urlString: string): Record<string, string> {
		const url: URL | null = this.PARSE_URL(urlString);
		if (!url) return {};
		return Object.fromEntries(url.searchParams.entries());
	}
}

const {
	UNIQUE,
	CHUNK,
	FLATTEN,
	PICK,
	OMIT,
	SLEEP,
	RETRY,
	COPY_TO_CLIPBOARD,
	PARSE_URL,
	GET_URL_PARAMS,
}: NATIVE = NATIVE.getInstance();

// Arrays
UNIQUE([1, 2, 2, 3]);
CHUNK([1, 2, 3, 4, 5], 2);
FLATTEN([
	[1, 2],
	[3, 4],
]);

// Objects
PICK({ a: 1, b: 2, c: 3 }, ["a", "b"]);
OMIT({ a: 1, b: 2, c: 3 }, ["c"]);

// Async
await SLEEP(1000);
await RETRY(() => fetch("/api"), 3, 500);

// Clipboard
await COPY_TO_CLIPBOARD("Hola mundo");

// URL
PARSE_URL("https://example.com?foo=bar");
GET_URL_PARAMS("https://example.com?foo=bar&baz=qux");

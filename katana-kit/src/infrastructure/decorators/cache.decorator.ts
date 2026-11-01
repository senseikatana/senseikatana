/**
 * CacheDecorator - Decorator Pattern para caché de resultados.
 *
 * Envuelve una función asíncrona y memoiza su resultado por clave (los
 * argumentos serializados por defecto). No modifica la función original:
 * la caché se añade en tiempo de composición (Open/Closed).
 *
 * Nota: el nombre usa mayúscula inicial porque es un decorador composible,
 * no una función utilitaria (`use*`) del API pública.
 *
 * @typeParam T - Tipo de la función envuelta.
 * @param fn - La función asíncrona a decorar.
 * @param options - TTL en ms y estrategia de clave.
 * @returns La función decorada con caché.
 *
 * @example
 * ```ts
 * import { CacheDecorator } from "katanakit-js";
 *
 * const getCached = CacheDecorator(fetchUser, { ttlMs: 60_000 });
 * await getCached(1); // consulta
 * await getCached(1); // sirve de caché
 * ```
 *
 * @remarks Keys live in a `Map` (no prototype-pollution risk). Expired
 * entries are reclaimed lazily — when their key is requested again — and
 * `useClearCache()` drops everything. For high-cardinality keys (unbounded
 * input space) call `useClearCache()` periodically or set a `ttlMs`.
 */
export interface CacheDecoratorOptions {
	/** Time-to-live de cada entrada en milisegundos. `0` = sin expiración. */
	ttlMs?: number;
	/** Genera la clave de caché a partir de los argumentos. */
	keyFn?: (...args: unknown[]) => string;
}

/** Internal entry holding a value and its expiration timestamp. */
interface CacheEntry {
	value: unknown;
	expiresAt: number;
}

/** Default key function: JSON of the arguments with a stable shape. */
function defaultKeyFn(...args: unknown[]): string {
	return JSON.stringify(args);
}

/**
 * Creates a cache key from `fn` identity plus the call arguments, so two
 * decorated functions never share entries even with identical arguments.
 */
function makeKey(fn: (...args: never[]) => unknown, key: string): string {
	const fnId = fn.name || "anonymous";
	return `${fnId}:${key}`;
}

/**
 * Decorates an async function with memoized results (Decorator Pattern).
 *
 * @typeParam T - The async function type.
 * @param fn - The function to decorate.
 * @param options - TTL and key strategy.
 * @returns The decorated function with an attached cache registry.
 *
 * @example
 * ```ts
 * const getCached = CacheDecorator(async (id: number) => fetchUser(id), { ttlMs: 30_000 });
 * ```
 */
export function CacheDecorator<T extends (...args: never[]) => Promise<unknown>>(
	fn: T,
	options: CacheDecoratorOptions = {},
): T & { useClearCache: () => void; useCacheSize: () => number } {
	const { ttlMs = 0, keyFn = defaultKeyFn } = options;
	const store = new Map<string, CacheEntry>();

	const decorated = async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
		const key = makeKey(fn, keyFn(...args));
		const now = Date.now();

		const hit = store.get(key);
		if (hit && (ttlMs === 0 || hit.expiresAt > now)) {
			return hit.value as Awaited<ReturnType<T>>;
		}

		const value = (await fn(...args)) as Awaited<ReturnType<T>>;
		store.set(key, { value, expiresAt: now + ttlMs });
		return value;
	};

	const result = decorated as T & {
		useClearCache: () => void;
		useCacheSize: () => number;
	};

	/** Empties the cache (all entries). */
	result.useClearCache = () => store.clear();

	/** Number of entries currently held (expired entries included until evicted). */
	result.useCacheSize = () => store.size;

	return result;
}

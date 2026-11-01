/**
 * Null-safe, type-safe array and object collection helpers.
 *
 * Every helper accepts `null` / `undefined` and returns a sensible empty
 * value instead of throwing, because collection data usually arrives from an
 * external REST API where a missing field is normal rather than exceptional.
 * The synchronous helpers never mutate their input — `Array.prototype.sort`
 * and `reverse` do, which makes them unsafe to hand a result from a shared
 * cache or a store selector.
 *
 * Asynchronous helpers differ deliberately: `useMapAsync` and `useFilterAsync`
 * run every callback in parallel and preserve input order, while
 * `useFindAsync`, `useSomeAsync` and `useEveryAsync` short-circuit as soon as
 * the answer is known, because issuing the remaining calls would only waste
 * network round-trips.
 */

type NullableArray<T> = readonly T[] | null | undefined;

/**
 * `ArrayService` — singleton facade for collection helpers.
 *
 * @example
 * ```ts
 * const arrays = ArrayService.getInstance();
 * arrays.useFilter(products, (product) => product.inStock);
 * ```
 */
export class ArrayService {
	private static instance: ArrayService;

	private constructor() {}

	static getInstance(): ArrayService {
		if (!ArrayService.instance) {
			ArrayService.instance = new ArrayService();
		}
		return ArrayService.instance;
	}

	/* ---------------------------------------------------------------------- */
	/* Filtering                                                              */
	/* ---------------------------------------------------------------------- */

	/**
	 * Keeps the items that satisfy `predicate`. Returns `[]` for nullish input.
	 *
	 * @param array - Source collection, possibly nullish.
	 * @param predicate - Receives the item, its index and the source array.
	 * @returns A new array of matching items.
	 *
	 * @example
	 * ```ts
	 * useFilter(products, (product) => product.inStock);
	 * useFilter(undefined, () => true); // []
	 * ```
	 */
	useFilter<T>(
		array: NullableArray<T>,
		predicate: (item: T, index: number, array: readonly T[]) => boolean,
	): T[] {
		return array ? [...array].filter(predicate) : [];
	}

	/**
	 * Returns the first item satisfying `predicate`, or `undefined`.
	 *
	 * @param array - Source collection, possibly nullish.
	 * @param predicate - Receives the item, its index and the source array.
	 * @returns The first match, or `undefined`.
	 */
	useFind<T>(
		array: NullableArray<T>,
		predicate: (item: T, index: number, array: readonly T[]) => boolean,
	): T | undefined {
		return array ? array.find(predicate) : undefined;
	}

	/**
	 * Returns the last item satisfying `predicate`, or `undefined`.
	 *
	 * Implemented with an explicit reverse scan rather than
	 * `Array.prototype.findLast`, so it typechecks under the project's ES2022
	 * `lib` and keeps working on any runtime.
	 *
	 * @param array - Source collection, possibly nullish.
	 * @param predicate - Receives the item, its index and the source array.
	 * @returns The last match, or `undefined`.
	 */
	useFindLast<T>(
		array: NullableArray<T>,
		predicate: (item: T, index: number, array: readonly T[]) => boolean,
	): T | undefined {
		if (!array) return undefined;
		for (let index = array.length - 1; index >= 0; index -= 1) {
			if (predicate(array[index], index, array)) return array[index];
		}
		return undefined;
	}

	/**
	 * Returns the index of the first match, or `-1`.
	 *
	 * @param array - Source collection, possibly nullish.
	 * @param predicate - Receives the item, its index and the source array.
	 * @returns The index of the first match, or `-1`.
	 */
	useFindIndex<T>(
		array: NullableArray<T>,
		predicate: (item: T, index: number, array: readonly T[]) => boolean,
	): number {
		return array ? array.findIndex(predicate) : -1;
	}

	/**
	 * Returns `true` when at least one item satisfies `predicate`. Nullish input
	 * is `false`, never `true`.
	 *
	 * @param array - Source collection, possibly nullish.
	 * @param predicate - Receives the item, its index and the source array.
	 * @returns Whether any item matches.
	 */
	useSome<T>(
		array: NullableArray<T>,
		predicate: (item: T, index: number, array: readonly T[]) => boolean,
	): boolean {
		return array ? array.some(predicate) : false;
	}

	/**
	 * Returns `true` when every item satisfies `predicate`. Nullish input is
	 * `false`, because "every item passed" must not be vacuously true for a
	 * collection that does not exist.
	 *
	 * @param array - Source collection, possibly nullish.
	 * @param predicate - Receives the item, its index and the source array.
	 * @returns Whether all items match.
	 */
	useEvery<T>(
		array: NullableArray<T>,
		predicate: (item: T, index: number, array: readonly T[]) => boolean,
	): boolean {
		return array ? array.every(predicate) : false;
	}

	/**
	 * Splits the collection into `[matching, rest]`. Nullish input yields
	 * `[[], []]`.
	 *
	 * @param array - Source collection, possibly nullish.
	 * @param predicate - Receives the item, its index and the source array.
	 * @returns A tuple of the matching items and the rest.
	 *
	 * @example
	 * ```ts
	 * const [inStock, soldOut] = usePartition(products, (p) => p.inStock);
	 * ```
	 */
	usePartition<T>(
		array: NullableArray<T>,
		predicate: (item: T, index: number, array: readonly T[]) => boolean,
	): [T[], T[]] {
		if (!array) return [[], []];

		const matching: T[] = [];
		const rest: T[] = [];

		for (let index = 0; index < array.length; index += 1) {
			const item = array[index];
			const bucket = predicate(item, index, array) ? matching : rest;
			bucket.push(item);
		}

		return [matching, rest];
	}

	/* ---------------------------------------------------------------------- */
	/* Transforming                                                           */
	/* ---------------------------------------------------------------------- */

	/**
	 * Projects every item through `transform`. Returns `[]` for nullish input.
	 *
	 * @typeParam T - Source element type.
	 * @typeParam U - Projected element type.
	 * @param array - Source collection, possibly nullish.
	 * @param transform - Receives the item, its index and the source array.
	 * @returns A new array of projected values.
	 */
	useMap<T, U>(
		array: NullableArray<T>,
		transform: (item: T, index: number, array: readonly T[]) => U,
	): U[] {
		return array ? array.map(transform) : [];
	}

	/**
	 * Maps each item to a collection and flattens one level. Returns `[]` for
	 * nullish input.
	 *
	 * @typeParam T - Source element type.
	 * @typeParam U - Flattened element type.
	 * @param array - Source collection, possibly nullish.
	 * @param transform - Returns an iterable of `U` per item.
	 * @returns A new flattened array.
	 */
	useFlatMap<T, U>(
		array: NullableArray<T>,
		transform: (item: T, index: number, array: readonly T[]) => readonly U[],
	): U[] {
		return array ? array.flatMap(transform) : [];
	}

	/**
	 * Folds the collection into a single value. `initial` is required, so the
	 * return type is unambiguous even for an empty or nullish collection.
	 *
	 * @typeParam T - Source element type.
	 * @typeParam U - Accumulator type.
	 * @param array - Source collection, possibly nullish.
	 * @param reducer - Receives the accumulator, the item and its index.
	 * @param initial - Seed value.
	 * @returns The accumulated value.
	 */
	useReduce<T, U>(
		array: NullableArray<T>,
		reducer: (accumulator: U, item: T, index: number) => U,
		initial: U,
	): U {
		return array ? array.reduce(reducer, initial) : initial;
	}

	/**
	 * Sorts a **copy** of the collection by a derived key. `Array.prototype.sort`
	 * mutates in place, which would corrupt a shared array coming from a store
	 * or a cache; this never does.
	 *
	 * @typeParam T - Source element type.
	 * @param array - Source collection, possibly nullish.
	 * @param selector - Derives the comparable value from an item.
	 * @param direction - `"asc"` (default) or `"desc"`.
	 * @returns A new sorted array.
	 *
	 * @example
	 * ```ts
	 * useSortBy(products, (product) => product.price, "desc");
	 * ```
	 */
	useSortBy<T>(
		array: NullableArray<T>,
		selector: (item: T) => number | string | bigint | boolean | Date,
		direction: "asc" | "desc" = "asc",
	): T[] {
		if (!array) return [];
		const sign = direction === "desc" ? -1 : 1;
		return [...array].sort((left, right) => {
			const a = selector(left);
			const b = selector(right);
			if (a instanceof Date && b instanceof Date) return sign * (a.getTime() - b.getTime());
			if (a === b) return 0;
			return sign * (a < b ? -1 : 1);
		});
	}

	/**
	 * Returns a reversed **copy**. The native `reverse` mutates in place.
	 *
	 * @param array - Source collection, possibly nullish.
	 * @returns A new reversed array.
	 */
	useReverse<T>(array: NullableArray<T>): T[] {
		return array ? [...array].reverse() : [];
	}

	/* ---------------------------------------------------------------------- */
	/* Objects                                                                */
	/* ---------------------------------------------------------------------- */

	/**
	 * Typed `Object.keys`. The native call returns `string[]`, losing the key
	 * union of the object it was given.
	 *
	 * @typeParam T - Object type.
	 * @param object - Source object, possibly nullish.
	 * @returns The object keys as a `keyof` array.
	 *
	 * @example
	 * ```ts
	 * useKeys(user); // ("id" | "name" | "email")[]
	 * ```
	 */
	useKeys<T extends object>(object: T | null | undefined): (keyof T)[] {
		return object ? (Object.keys(object) as (keyof T)[]) : [];
	}

	/**
	 * Typed `Object.values`. The native call returns `unknown[]`.
	 *
	 * @typeParam T - Object type.
	 * @param object - Source object, possibly nullish.
	 * @returns The object values.
	 */
	useValues<T extends object>(object: T | null | undefined): T[keyof T][] {
		return object ? (Object.values(object) as T[keyof T][]) : [];
	}

	/**
	 * Typed `Object.fromEntries`. Returns `{}` for nullish input.
	 *
	 * @typeParam K - Key type.
	 * @typeParam V - Value type.
	 * @param entries - Entry pairs, possibly nullish.
	 * @returns A new record.
	 *
	 * @example
	 * ```ts
	 * useFromEntries(products.map((p) => [p.id, p.name] as const));
	 * ```
	 */
	useFromEntries<K extends PropertyKey, V>(
		entries: readonly (readonly [K, V])[] | null | undefined,
	): Record<K, V> {
		return entries ? (Object.fromEntries(entries) as Record<K, V>) : ({} as Record<K, V>);
	}

	/* ---------------------------------------------------------------------- */
	/* Asynchronous                                                            */
	/* ---------------------------------------------------------------------- */

	/**
	 * Keeps the items whose async predicate resolves truthy. Every predicate runs
	 * in parallel and the input order is preserved.
	 *
	 * @param array - Source collection, possibly nullish.
	 * @param predicate - Async test per item.
	 * @returns A promise of the matching items.
	 */
	async useFilterAsync<T>(
		array: NullableArray<T>,
		predicate: (item: T, index: number) => Promise<boolean>,
	): Promise<T[]> {
		if (!array || array.length === 0) return [];
		const verdicts = await Promise.all(array.map(predicate));
		return array.filter((_, index) => verdicts[index]);
	}

	/**
	 * Projects every item through an async transform, in parallel, preserving
	 * input order.
	 *
	 * @typeParam T - Source element type.
	 * @typeParam U - Projected element type.
	 * @param array - Source collection, possibly nullish.
	 * @param transform - Async projection per item.
	 * @returns A promise of the projected values.
	 */
	async useMapAsync<T, U>(
		array: NullableArray<T>,
		transform: (item: T, index: number) => Promise<U>,
	): Promise<U[]> {
		if (!array || array.length === 0) return [];
		return Promise.all(array.map(transform));
	}

	/**
	 * Returns the first item whose async predicate resolves truthy. Short
	 * circuits: later predicates are never invoked.
	 *
	 * @param array - Source collection, possibly nullish.
	 * @param predicate - Async test per item.
	 * @returns A promise of the first match, or `undefined`.
	 */
	async useFindAsync<T>(
		array: NullableArray<T>,
		predicate: (item: T, index: number) => Promise<boolean>,
	): Promise<T | undefined> {
		if (!array) return undefined;
		for (let index = 0; index < array.length; index += 1) {
			if (await predicate(array[index], index)) return array[index];
		}
		return undefined;
	}

	/**
	 * Returns `true` when at least one async predicate resolves truthy. Short
	 * circuits on the first match.
	 *
	 * @param array - Source collection, possibly nullish.
	 * @param predicate - Async test per item.
	 * @returns A promise of whether any item matches.
	 */
	async useSomeAsync<T>(
		array: NullableArray<T>,
		predicate: (item: T, index: number) => Promise<boolean>,
	): Promise<boolean> {
		if (!array) return false;
		for (let index = 0; index < array.length; index += 1) {
			if (await predicate(array[index], index)) return true;
		}
		return false;
	}

	/**
	 * Returns `true` when every async predicate resolves truthy. Short circuits
	 * on the first failure.
	 *
	 * @param array - Source collection, possibly nullish.
	 * @param predicate - Async test per item.
	 * @returns A promise of whether all items match.
	 */
	async useEveryAsync<T>(
		array: NullableArray<T>,
		predicate: (item: T, index: number) => Promise<boolean>,
	): Promise<boolean> {
		if (!array || array.length === 0) return false;
		for (let index = 0; index < array.length; index += 1) {
			if (!(await predicate(array[index], index))) return false;
		}
		return true;
	}

	/**
	 * Folds the collection with an async reducer, sequentially — a reduce that
	 * ran in parallel could not be ordered.
	 *
	 * @typeParam T - Source element type.
	 * @typeParam U - Accumulator type.
	 * @param array - Source collection, possibly nullish.
	 * @param reducer - Async step receiving the accumulator, the item and its index.
	 * @param initial - Seed value.
	 * @returns A promise of the accumulated value.
	 */
	async useReduceAsync<T, U>(
		array: NullableArray<T>,
		reducer: (accumulator: U, item: T, index: number) => Promise<U>,
		initial: U,
	): Promise<U> {
		if (!array) return initial;
		let accumulator = initial;
		for (let index = 0; index < array.length; index += 1) {
			accumulator = await reducer(accumulator, array[index], index);
		}
		return accumulator;
	}
}
/* -------------------------------------------------------------------------- */
/* Module-level wrappers                                                        */
/* -------------------------------------------------------------------------- */

type Predicate<T> = (item: T, index: number, array: readonly T[]) => boolean;
type AsyncPredicate<T> = (item: T, index: number) => Promise<boolean>;

/** Keeps the items that satisfy `predicate`. See {@link ArrayService.useFilter}. */
export function useFilter<T>(array: NullableArray<T>, predicate: Predicate<T>): T[] {
	return ArrayService.getInstance().useFilter(array, predicate);
}

/** Returns the first matching item, or `undefined`. See {@link ArrayService.useFind}. */
export function useFind<T>(array: NullableArray<T>, predicate: Predicate<T>): T | undefined {
	return ArrayService.getInstance().useFind(array, predicate);
}

/** Returns the last matching item, or `undefined`. See {@link ArrayService.useFindLast}. */
export function useFindLast<T>(array: NullableArray<T>, predicate: Predicate<T>): T | undefined {
	return ArrayService.getInstance().useFindLast(array, predicate);
}

/** Returns the index of the first match, or `-1`. See {@link ArrayService.useFindIndex}. */
export function useFindIndex<T>(array: NullableArray<T>, predicate: Predicate<T>): number {
	return ArrayService.getInstance().useFindIndex(array, predicate);
}

/** Whether any item matches. See {@link ArrayService.useSome}. */
export function useSome<T>(array: NullableArray<T>, predicate: Predicate<T>): boolean {
	return ArrayService.getInstance().useSome(array, predicate);
}

/** Whether every item matches. See {@link ArrayService.useEvery}. */
export function useEvery<T>(array: NullableArray<T>, predicate: Predicate<T>): boolean {
	return ArrayService.getInstance().useEvery(array, predicate);
}

/** Splits into `[matching, rest]`. See {@link ArrayService.usePartition}. */
export function usePartition<T>(array: NullableArray<T>, predicate: Predicate<T>): [T[], T[]] {
	return ArrayService.getInstance().usePartition(array, predicate);
}

/** Projects every item. See {@link ArrayService.useMap}. */
export function useMap<T, U>(
	array: NullableArray<T>,
	transform: (item: T, index: number, array: readonly T[]) => U,
): U[] {
	return ArrayService.getInstance().useMap(array, transform);
}

/** Maps to collections and flattens one level. See {@link ArrayService.useFlatMap}. */
export function useFlatMap<T, U>(
	array: NullableArray<T>,
	transform: (item: T, index: number, array: readonly T[]) => readonly U[],
): U[] {
	return ArrayService.getInstance().useFlatMap(array, transform);
}

/** Folds into a single value. See {@link ArrayService.useReduce}. */
export function useReduce<T, U>(
	array: NullableArray<T>,
	reducer: (accumulator: U, item: T, index: number) => U,
	initial: U,
): U {
	return ArrayService.getInstance().useReduce(array, reducer, initial);
}

/** Sorts a copy by a derived key. See {@link ArrayService.useSortBy}. */
export function useSortBy<T>(
	array: NullableArray<T>,
	selector: (item: T) => number | string | bigint | boolean | Date,
	direction: "asc" | "desc" = "asc",
): T[] {
	return ArrayService.getInstance().useSortBy(array, selector, direction);
}

/** Returns a reversed copy. See {@link ArrayService.useReverse}. */
export function useReverse<T>(array: NullableArray<T>): T[] {
	return ArrayService.getInstance().useReverse(array);
}

/** Typed `Object.keys`. See {@link ArrayService.useKeys}. */
export function useKeys<T extends object>(object: T | null | undefined): (keyof T)[] {
	return ArrayService.getInstance().useKeys(object);
}

/** Typed `Object.values`. See {@link ArrayService.useValues}. */
export function useValues<T extends object>(object: T | null | undefined): T[keyof T][] {
	return ArrayService.getInstance().useValues(object);
}

/** Typed `Object.fromEntries`. See {@link ArrayService.useFromEntries}. */
export function useFromEntries<K extends PropertyKey, V>(
	entries: readonly (readonly [K, V])[] | null | undefined,
): Record<K, V> {
	return ArrayService.getInstance().useFromEntries(entries);
}

/** Async filter, in parallel. See {@link ArrayService.useFilterAsync}. */
export function useFilterAsync<T>(
	array: NullableArray<T>,
	predicate: AsyncPredicate<T>,
): Promise<T[]> {
	return ArrayService.getInstance().useFilterAsync(array, predicate);
}

/** Async map, in parallel. See {@link ArrayService.useMapAsync}. */
export function useMapAsync<T, U>(
	array: NullableArray<T>,
	transform: (item: T, index: number) => Promise<U>,
): Promise<U[]> {
	return ArrayService.getInstance().useMapAsync(array, transform);
}

/** Async find, short-circuiting. See {@link ArrayService.useFindAsync}. */
export function useFindAsync<T>(
	array: NullableArray<T>,
	predicate: AsyncPredicate<T>,
): Promise<T | undefined> {
	return ArrayService.getInstance().useFindAsync(array, predicate);
}

/** Async some, short-circuiting. See {@link ArrayService.useSomeAsync}. */
export function useSomeAsync<T>(
	array: NullableArray<T>,
	predicate: AsyncPredicate<T>,
): Promise<boolean> {
	return ArrayService.getInstance().useSomeAsync(array, predicate);
}

/** Async every, short-circuiting. See {@link ArrayService.useEveryAsync}. */
export function useEveryAsync<T>(
	array: NullableArray<T>,
	predicate: AsyncPredicate<T>,
): Promise<boolean> {
	return ArrayService.getInstance().useEveryAsync(array, predicate);
}

/** Async reduce, sequential. See {@link ArrayService.useReduceAsync}. */
export function useReduceAsync<T, U>(
	array: NullableArray<T>,
	reducer: (accumulator: U, item: T, index: number) => Promise<U>,
	initial: U,
): Promise<U> {
	return ArrayService.getInstance().useReduceAsync(array, reducer, initial);
}

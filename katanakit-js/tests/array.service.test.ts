import { describe, expect, it } from "vitest";

import {
	useEvery,
	useEveryAsync,
	useFilter,
	useFilterAsync,
	useFind,
	useFindAsync,
	useFindIndex,
	useFindLast,
	useFlatMap,
	useFromEntries,
	useKeys,
	useMap,
	useMapAsync,
	usePartition,
	useReduce,
	useReduceAsync,
	useReverse,
	useSome,
	useSomeAsync,
	useSortBy,
	useValues,
} from "@/core/services/array.service";

interface Product {
	id: string;
	name: string;
	price: number;
	inStock: boolean;
}

const products: Product[] = [
	{ id: "a", name: "Alpha", price: 30, inStock: true },
	{ id: "b", name: "Beta", price: 10, inStock: false },
	{ id: "c", name: "Gamma", price: 20, inStock: true },
];

describe("nullish handling", () => {
	it("returns empty values instead of throwing for nullish input", () => {
		expect(useFilter(null, () => true)).toEqual([]);
		expect(useFilter(undefined, () => true)).toEqual([]);
		expect(useMap<Product, string>(null, (p) => p.name)).toEqual([]);
		expect(useFind(null, () => true)).toBeUndefined();
		expect(useFindLast(null, () => true)).toBeUndefined();
		expect(useFindIndex(null, () => true)).toBe(-1);
		expect(useSome(null, () => true)).toBe(false);
		expect(useEvery(null, () => true)).toBe(false);
		expect(useFlatMap<Product, string>(null, () => [])).toEqual([]);
		expect(useSortBy<Product>(null, (p) => p.price)).toEqual([]);
		expect(useReverse<Product>(null)).toEqual([]);
		expect(useKeys(null)).toEqual([]);
		expect(useValues(null)).toEqual([]);
		expect(useFromEntries(null)).toEqual({});
	});

	it("never lets 'every' be vacuously true for a missing collection", () => {
		// The trap: [].every(() => false) is true, so an empty array would
		// claim "everything passed". A missing collection must not.
		expect(useEvery([], () => false)).toBe(true);
		expect(useEvery(null, () => false)).toBe(false);
	});

	it("seeds reduce with the initial value for an empty collection", () => {
		expect(useReduce<Product, number>([], (acc) => acc + 1, 0)).toBe(0);
		expect(useReduce<Product, number>(null, (acc) => acc + 1, 0)).toBe(0);
	});
});

describe("filtering", () => {
	it("keeps only matching items and preserves order", () => {
		expect(useFilter(products, (p) => p.inStock).map((p) => p.id)).toEqual(["a", "c"]);
	});

	it("returns the first and last match", () => {
		expect(useFind(products, (p) => p.inStock)?.id).toBe("a");
		expect(useFindLast(products, (p) => p.inStock)?.id).toBe("c");
		expect(useFindIndex(products, (p) => p.id === "b")).toBe(1);
		expect(useFindIndex(products, () => false)).toBe(-1);
	});

	it("scans from the end for useFindLast", () => {
		const seen: number[] = [];
		useFindLast(products, (item, index) => {
			seen.push(index);
			return item.id === "a";
		});
		expect(seen).toEqual([2, 1, 0]);
	});

	it("splits into matching and rest", () => {
		const [inStock, soldOut] = usePartition(products, (p) => p.inStock);
		expect(inStock.map((p) => p.id)).toEqual(["a", "c"]);
		expect(soldOut.map((p) => p.id)).toEqual(["b"]);
	});

	it("passes index and array to the predicate", () => {
		const indexes: number[] = [];
		useFilter(products, (_item, index) => {
			indexes.push(index);
			return false;
		});
		expect(indexes).toEqual([0, 1, 2]);
	});
});

describe("transforming", () => {
	it("projects and flattens", () => {
		expect(useMap(products, (p) => p.name)).toEqual(["Alpha", "Beta", "Gamma"]);
		// "Alpha"(5) + "Beta"(4) + "Gamma"(5)
		expect(useFlatMap(products, (p) => p.name.split(""))).toHaveLength(14);
	});

	it("folds with the accumulator", () => {
		expect(useReduce(products, (total, p) => total + p.price, 0)).toBe(60);
	});

	it("sorts by a key without mutating the source", () => {
		const sorted = useSortBy(products, (p) => p.price);

		expect(sorted.map((p) => p.id)).toEqual(["b", "c", "a"]);
		expect(products.map((p) => p.id)).toEqual(["a", "b", "c"]);
	});

	it("sorts descending", () => {
		expect(useSortBy(products, (p) => p.price, "desc").map((p) => p.id)).toEqual(["a", "c", "b"]);
	});

	it("sorts Date keys numerically, not lexicographically", () => {
		const events = [{ at: new Date("2026-10-18") }, { at: new Date("2026-01-05") }];
		expect(useSortBy(events, (e) => e.at).map((e) => e.at.getFullYear())).toEqual([2026, 2026]);
		expect(useSortBy(events, (e) => e.at)[0].at.getMonth()).toBe(0);
	});

	it("reverses a copy without mutating the source", () => {
		expect(useReverse(products).map((p) => p.id)).toEqual(["c", "b", "a"]);
		expect(products.map((p) => p.id)).toEqual(["a", "b", "c"]);
	});
});

describe("objects", () => {
	it("narrows keys and values", () => {
		const user = { id: "1", name: "Ana", age: 33 };
		expect(useKeys(user).sort()).toEqual(["age", "id", "name"]);
		expect(useValues(user).sort()).toEqual(["1", 33, "Ana"].sort());
	});

	it("builds a record from entries", () => {
		const byId = useFromEntries(products.map((p) => [p.id, p.name] as const));
		expect(byId).toEqual({ a: "Alpha", b: "Beta", c: "Gamma" });
	});
});

describe("async", () => {
	it("maps in parallel and preserves order", async () => {
		const delays = [30, 1, 15];
		const started = Date.now();
		const result = await useMapAsync(products, async (p, index) => {
			await new Promise((resolve) => setTimeout(resolve, delays[index]));
			return p.id;
		});

		expect(result).toEqual(["a", "b", "c"]);
		expect(Date.now() - started).toBeLessThan(45);
	});

	it("filters asynchronously", async () => {
		const kept = await useFilterAsync(products, async (p) => p.inStock);
		expect(kept.map((p) => p.id)).toEqual(["a", "c"]);
	});

	it("short-circuits useFindAsync once the answer is known", async () => {
		const visited: string[] = [];
		const found = await useFindAsync(products, async (p) => {
			visited.push(p.id);
			return p.id === "a";
		});

		expect(found?.id).toBe("a");
		expect(visited).toEqual(["a"]);
	});

	it("short-circuits useSomeAsync on the first match", async () => {
		const visited: string[] = [];
		const result = await useSomeAsync(products, async (p) => {
			visited.push(p.id);
			return p.inStock;
		});

		expect(result).toBe(true);
		expect(visited).toEqual(["a"]);
	});

	it("short-circuits useEveryAsync on the first failure", async () => {
		const visited: string[] = [];
		const result = await useEveryAsync(products, async (p) => {
			visited.push(p.id);
			return p.inStock;
		});

		// "a" passes (inStock), "b" fails, so "c" is never visited.
		expect(result).toBe(false);
		expect(visited).toEqual(["a", "b"]);
	});

	it("reduces sequentially", async () => {
		const order: string[] = [];
		const total = await useReduceAsync(
			products,
			async (acc, p) => {
				order.push(p.id);
				await new Promise((resolve) => setTimeout(resolve, 1));
				return acc + p.price;
			},
			0,
		);

		expect(total).toBe(60);
		expect(order).toEqual(["a", "b", "c"]);
	});

	it("returns empty values for nullish async input", async () => {
		await expect(useFilterAsync(null, async () => true)).resolves.toEqual([]);
		await expect(useMapAsync(null, async () => 1)).resolves.toEqual([]);
		await expect(useFindAsync(null, async () => true)).resolves.toBeUndefined();
		await expect(useSomeAsync(null, async () => true)).resolves.toBe(false);
		await expect(useEveryAsync(null, async () => true)).resolves.toBe(false);
		await expect(useReduceAsync(null, async (acc) => acc, 7)).resolves.toBe(7);
	});
});

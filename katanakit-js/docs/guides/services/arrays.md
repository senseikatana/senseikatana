---
title: Arrays
description: "Null-safe, type-safe helpers for filtering, mapping and shaping collections — including results from external APIs."
---

# Arrays

`array.service.ts` hosts the Singleton facade `ArrayService`, whose methods
are re-exported as thin `use*` helpers — no instance to create. They exist for
one reason:

> **`products.filter()` throws when the API did not return `products`.**

External data is the normal case, not the exception. A `204`, a partial
response, or a field that is simply absent all produce `undefined` — and
`products.filter(...)` turns that into an unhandled `TypeError` three frames
away from the actual cause.

Every helper here accepts `null` / `undefined` and returns a sensible empty
value instead:

```ts
import { useFilter, useMap, useSortBy } from "katanakit-js";

const { data, error } = await useGet<Product>("shop", "products");

if (error) return renderError(error);

// data is Product[] | null | undefined — and these three calls are safe.
const inStock = useFilter(data, (product) => product.inStock);
const names = useMap(data, (product) => product.name);
const cheapest = useSortBy(data, (product) => product.price);
```

`ArrayService.getInstance()` exposes the same methods on a singleton, if you
prefer the facade style.

## Two guarantees

1. **Nullish in, empty out.** `useFilter(null, fn)` is `[]`, `useFind(null, fn)`
   is `undefined`, `useFindIndex(null, fn)` is `-1`, `useSome` is `false`,
   `useReduce` returns the initial value.
2. **Nothing mutates its input.** `Array.prototype.sort` and `reverse` mutate in
   place — dangerous when the array came from a store, a cache or a query
   result you do not own. `useSortBy` and `useReverse` always return a copy.

## Why not just use the native methods?

For pure in-memory data, the native methods are fine and you should use them.
These helpers earn their place at three seams:

| Seam | Native | Here |
| --- | --- | --- |
| Data from an external API | throws on `undefined` | returns `[]` / `undefined` |
| Sorting a shared array | mutates the original | returns a sorted copy |
| `Object.keys(obj)` | `string[]` | `(keyof T)[]` |

## Filtering

### useFilter(array, predicate)

Keeps the items that satisfy `predicate`. The predicate receives the item, its
index and the source array — the same signature as the native one.

```ts
const cheap = useFilter(products, (product) => product.price < 20);
const names = cheap.map((product) => product.name);   // Product[] -> string[]
```

### useFind(array, predicate) / useFindLast(array, predicate) / useFindIndex(array, predicate)

The first match, the last match, or its index. `-1` when there is no match.

```ts
useFind(products, (product) => product.id === wanted);   // Product | undefined
useFindLast(products, (product) => product.inStock);
useFindIndex(products, (product) => product.id === "sku-1");
```

`useFindLast` scans from the end, so it is safe to pass a predicate with side
effects.

### useSome(array, predicate) / useEvery(array, predicate)

Whether at least one, or every, item matches.

One deliberate difference from the native behaviour: **nullish input is
`false` for both.** `[].every(() => false)` is `true`, so a missing collection
must not silently claim "everything passed".

### usePartition(array, predicate)

Splits into `[matching, rest]` in a single pass.

```ts
const [inStock, soldOut] = usePartition(products, (product) => product.inStock);
```

## Transforming

### useMap(array, transform)

Projects every item. Returns `[]` for nullish input — and this is the pair you
reach for when composing, because the native `.map()` cannot be chained onto
possibly-nullish data:

```ts
const byId = useFromEntries(useMap(products, (product) => [product.id, product.name] as const));
```

### useFlatMap(array, transform) / useReduce(array, reducer, initial)

Map-then-flatten one level, and fold to a single value. `initial` is **required**
in `useReduce` so the return type stays unambiguous for an empty collection.

```ts
useFlatMap(orders, (order) => order.lines);
useReduce(products, (total, product) => total + product.price, 0);
```

### useSortBy(array, selector, direction?)

Sorts a **copy** by a derived key. `Date` keys compare chronologically, not as
strings — which is the bug you get from a hand-written comparator.

```ts
useSortBy(products, (product) => product.price);              // ascending
useSortBy(products, (product) => product.price, "desc");
useSortBy(products, (product) => product.releasedAt);         // Date, correct order
```

### useReverse(array)

A reversed copy. The native `reverse` mutates in place.

## Objects

### useKeys(object) / useValues(object)

Typed `Object.keys` / `Object.values`. The native calls return `string[]` and
`unknown[]` respectively; these preserve the shape of the object.

```ts
const user = { id: "1", name: "Ana" };

useKeys(user);   // ("id" | "name")[]  — not string[]
useValues(user); // string[]
```

### useFromEntries(entries)

Typed `Object.fromEntries`. Returns `{}` for nullish input.

```ts
const byId = useFromEntries(useMap(products, (product) => [product.id, product] as const));
// Record<string, Product>
```

## Async

The asynchronous helpers are **not** a thin `Promise.all` wrapper. They differ on
purpose, because the two shapes have different network costs:

| Helper | Execution | Why |
| --- | --- | --- |
| `useMapAsync`, `useFilterAsync` | **parallel**, input order preserved | every item is needed anyway |
| `useFindAsync`, `useSomeAsync`, `useEveryAsync` | **sequential, short-circuit** | stop at the first answer |
| `useReduceAsync` | sequential | a reduce cannot be reordered |

```ts
// Six requests fire at once and come back in order.
const details = await useMapAsync(ids, (id) => fetchProduct(id));

// Only the first request that matches is ever sent.
const first = await useFindAsync(ids, async (id) => (await isAvailable(id)) === true);
```

Short-circuiting is observable, and covered by tests: `useFindAsync` stops
after the first matching item, so no further requests are issued.

## Already in UtilsService

These predate this module and live in `utils.service.ts`. They cover the array
operations that **native JavaScript does not have at all**:

```ts
import { useUnique, useChunk, useGroupBy } from "katanakit-js";

useUnique([1, 2, 2, 3, 1]);            // [1, 2, 3]
useChunk([1, 2, 3, 4, 5], 2);          // [[1, 2], [3, 4], [5]]
useGroupBy(items, "type");             // Record<string, Item[]>
```

`usePick`, `useOmit`, `useDeepClone` and `useDeepMerge` are the object
counterparts.

## Choosing between them

- Pure local data, already known to be an array → **the native methods**. They
  are faster and there is no ambiguity.
- Anything from a network call, a form, local storage or a query result →
  **these helpers**, because `null` is a real possibility at that boundary.
- `Map`, `Set` and `NodeList` → convert first with `Array.from`. For DOM
  collections, [`useQuerySelectorAll`](/guides/services/dom) already returns a
  real array.

## Related

- [DOM](/guides/services/dom) — `useQuerySelectorAll` returns `Element[]`, so
  every helper above applies directly to the result.
- [Error Handling](/guides/errors) — `useGet` returns Safe Results, which is why
  nullish collections reach these helpers in the first place.
- [API Reference](/api/) — every export, generated from source.
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
import { onFilter, onMap, onSortBy } from "katanakit-js";

const { data, error } = await onGet<Product>("shop", "products");

if (error) return renderError(error);

// data is Product[] | null | undefined — and these three calls are safe.
const inStock = onFilter(data, (product) => product.inStock);
const names = onMap(data, (product) => product.name);
const cheapest = onSortBy(data, (product) => product.price);
```

`ArrayService.getInstance()` exposes the same methods on a singleton, if you
prefer the facade style.

## Two guarantees

1. **Nullish in, empty out.** `onFilter(null, fn)` is `[]`, `onFind(null, fn)`
   is `undefined`, `onFindIndex(null, fn)` is `-1`, `onSome` is `false`,
   `onReduce` returns the initial value.
2. **Nothing mutates its input.** `Array.prototype.sort` and `reverse` mutate in
   place — dangerous when the array came from a store, a cache or a query
   result you do not own. `onSortBy` and `onReverse` always return a copy.

## Why not just use the native methods?

For pure in-memory data, the native methods are fine and you should use them.
These helpers earn their place at three seams:

| Seam | Native | Here |
| --- | --- | --- |
| Data from an external API | throws on `undefined` | returns `[]` / `undefined` |
| Sorting a shared array | mutates the original | returns a sorted copy |
| `Object.keys(obj)` | `string[]` | `(keyof T)[]` |

## Filtering

### onFilter(array, predicate)

Keeps the items that satisfy `predicate`. The predicate receives the item, its
index and the source array — the same signature as the native one.

```ts
const cheap = onFilter(products, (product) => product.price < 20);
const names = cheap.map((product) => product.name);   // Product[] -> string[]
```

### onFind(array, predicate) / onFindLast(array, predicate) / onFindIndex(array, predicate)

The first match, the last match, or its index. `-1` when there is no match.

```ts
onFind(products, (product) => product.id === wanted);   // Product | undefined
onFindLast(products, (product) => product.inStock);
onFindIndex(products, (product) => product.id === "sku-1");
```

`onFindLast` scans from the end, so it is safe to pass a predicate with side
effects.

### onSome(array, predicate) / onEvery(array, predicate)

Whether at least one, or every, item matches.

One deliberate difference from the native behaviour: **nullish input is
`false` for both.** `[].every(() => false)` is `true`, so a missing collection
must not silently claim "everything passed".

### onPartition(array, predicate)

Splits into `[matching, rest]` in a single pass.

```ts
const [inStock, soldOut] = onPartition(products, (product) => product.inStock);
```

## Transforming

### onMap(array, transform)

Projects every item. Returns `[]` for nullish input — and this is the pair you
reach for when composing, because the native `.map()` cannot be chained onto
possibly-nullish data:

```ts
const byId = onFromEntries(onMap(products, (product) => [product.id, product.name] as const));
```

### onFlatMap(array, transform) / onReduce(array, reducer, initial)

Map-then-flatten one level, and fold to a single value. `initial` is **required**
in `onReduce` so the return type stays unambiguous for an empty collection.

```ts
onFlatMap(orders, (order) => order.lines);
onReduce(products, (total, product) => total + product.price, 0);
```

### onSortBy(array, selector, direction?)

Sorts a **copy** by a derived key. `Date` keys compare chronologically, not as
strings — which is the bug you get from a hand-written comparator.

```ts
onSortBy(products, (product) => product.price);              // ascending
onSortBy(products, (product) => product.price, "desc");
onSortBy(products, (product) => product.releasedAt);         // Date, correct order
```

### onReverse(array)

A reversed copy. The native `reverse` mutates in place.

## Objects

### onKeys(object) / onValues(object)

Typed `Object.keys` / `Object.values`. The native calls return `string[]` and
`unknown[]` respectively; these preserve the shape of the object.

```ts
const user = { id: "1", name: "Ana" };

onKeys(user);   // ("id" | "name")[]  — not string[]
onValues(user); // string[]
```

### onFromEntries(entries)

Typed `Object.fromEntries`. Returns `{}` for nullish input.

```ts
const byId = onFromEntries(onMap(products, (product) => [product.id, product] as const));
// Record<string, Product>
```

## Async

The asynchronous helpers are **not** a thin `Promise.all` wrapper. They differ on
purpose, because the two shapes have different network costs:

| Helper | Execution | Why |
| --- | --- | --- |
| `onMapAsync`, `onFilterAsync` | **parallel**, input order preserved | every item is needed anyway |
| `onFindAsync`, `onSomeAsync`, `onEveryAsync` | **sequential, short-circuit** | stop at the first answer |
| `onReduceAsync` | sequential | a reduce cannot be reordered |

```ts
// Six requests fire at once and come back in order.
const details = await onMapAsync(ids, (id) => fetchProduct(id));

// Only the first request that matches is ever sent.
const first = await onFindAsync(ids, async (id) => (await isAvailable(id)) === true);
```

Short-circuiting is observable, and covered by tests: `onFindAsync` stops
after the first matching item, so no further requests are issued.

## Already in UtilsService

These predate this module and live in `utils.service.ts`. They cover the array
operations that **native JavaScript does not have at all**:

```ts
import { onUnique, onChunk, onGroupBy } from "katanakit-js";

onUnique([1, 2, 2, 3, 1]);            // [1, 2, 3]
onChunk([1, 2, 3, 4, 5], 2);          // [[1, 2], [3, 4], [5]]
onGroupBy(items, "type");             // Record<string, Item[]>
```

`onPick`, `onOmit`, `onDeepClone` and `onDeepMerge` are the object
counterparts.

## Choosing between them

- Pure local data, already known to be an array → **the native methods**. They
  are faster and there is no ambiguity.
- Anything from a network call, a form, local storage or a query result →
  **these helpers**, because `null` is a real possibility at that boundary.
- `Map`, `Set` and `NodeList` → convert first with `Array.from`. For DOM
  collections, [`onQuerySelectorAll`](/guides/services/dom) already returns a
  real array.

## Related

- [DOM](/guides/services/dom) — `onQuerySelectorAll` returns `Element[]`, so
  every helper above applies directly to the result.
- [Error Handling](/start/errors) — `onGet` returns Safe Results, which is why
  nullish collections reach these helpers in the first place.
- [API Reference](/api/) — every export, generated from source.
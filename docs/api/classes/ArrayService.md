[katanakit-js](../index.md) / ArrayService

# Class: ArrayService

Defined in: [core/services/array.service.ts:29](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/array.service.ts#L29)

`ArrayService` — singleton facade for collection helpers.

## Example

```ts
const arrays = ArrayService.getInstance();
arrays.filter(products, (product) => product.inStock);
```

## Methods

### every()

```ts
every<T>(array, predicate): boolean;
```

Defined in: [core/services/array.service.ts:139](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/array.service.ts#L139)

Returns `true` when every item satisfies `predicate`. Nullish input is
`false`, because "every item passed" must not be vacuously true for a
collection that does not exist.

#### Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `array` | `NullableArray`\<`T`\> | Source collection, possibly nullish. |
| `predicate` | (`item`, `index`, `array`) => `boolean` | Receives the item, its index and the source array. |

#### Returns

`boolean`

Whether all items match.

***

### everyAsync()

```ts
everyAsync<T>(array, predicate): Promise<boolean>;
```

Defined in: [core/services/array.service.ts:411](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/array.service.ts#L411)

Returns `true` when every async predicate resolves truthy. Short circuits
on the first failure.

#### Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t-1"></a> `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `array` | `NullableArray`\<`T`\> | Source collection, possibly nullish. |
| `predicate` | (`item`, `index`) => `Promise`\<`boolean`\> | Async test per item. |

#### Returns

`Promise`\<`boolean`\>

A promise of whether all items match.

***

### filter()

```ts
filter<T>(array, predicate): T[];
```

Defined in: [core/services/array.service.ts:58](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/array.service.ts#L58)

Keeps the items that satisfy `predicate`. Returns `[]` for nullish input.

#### Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t-2"></a> `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `array` | `NullableArray`\<`T`\> | Source collection, possibly nullish. |
| `predicate` | (`item`, `index`, `array`) => `boolean` | Receives the item, its index and the source array. |

#### Returns

`T`[]

A new array of matching items.

#### Example

```ts
filter(products, (product) => product.inStock);
filter(undefined, () => true); // []
```

***

### filterAsync()

```ts
filterAsync<T>(array, predicate): Promise<T[]>;
```

Defined in: [core/services/array.service.ts:338](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/array.service.ts#L338)

Keeps the items whose async predicate resolves truthy. Every predicate runs
in parallel and the input order is preserved.

#### Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t-3"></a> `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `array` | `NullableArray`\<`T`\> | Source collection, possibly nullish. |
| `predicate` | (`item`, `index`) => `Promise`\<`boolean`\> | Async test per item. |

#### Returns

`Promise`\<`T`[]\>

A promise of the matching items.

***

### find()

```ts
find<T>(array, predicate): T | undefined;
```

Defined in: [core/services/array.service.ts:72](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/array.service.ts#L72)

Returns the first item satisfying `predicate`, or `undefined`.

#### Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t-4"></a> `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `array` | `NullableArray`\<`T`\> | Source collection, possibly nullish. |
| `predicate` | (`item`, `index`, `array`) => `boolean` | Receives the item, its index and the source array. |

#### Returns

`T` \| `undefined`

The first match, or `undefined`.

***

### findAsync()

```ts
findAsync<T>(array, predicate): Promise<T | undefined>;
```

Defined in: [core/services/array.service.ts:373](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/array.service.ts#L373)

Returns the first item whose async predicate resolves truthy. Short
circuits: later predicates are never invoked.

#### Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t-5"></a> `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `array` | `NullableArray`\<`T`\> | Source collection, possibly nullish. |
| `predicate` | (`item`, `index`) => `Promise`\<`boolean`\> | Async test per item. |

#### Returns

`Promise`\<`T` \| `undefined`\>

A promise of the first match, or `undefined`.

***

### findIndex()

```ts
findIndex<T>(array, predicate): number;
```

Defined in: [core/services/array.service.ts:108](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/array.service.ts#L108)

Returns the index of the first match, or `-1`.

#### Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t-6"></a> `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `array` | `NullableArray`\<`T`\> | Source collection, possibly nullish. |
| `predicate` | (`item`, `index`, `array`) => `boolean` | Receives the item, its index and the source array. |

#### Returns

`number`

The index of the first match, or `-1`.

***

### findLast()

```ts
findLast<T>(array, predicate): T | undefined;
```

Defined in: [core/services/array.service.ts:90](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/array.service.ts#L90)

Returns the last item satisfying `predicate`, or `undefined`.

Implemented with an explicit reverse scan rather than
`Array.prototype.findLast`, so it typechecks under the project's ES2022
`lib` and keeps working on any runtime.

#### Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t-7"></a> `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `array` | `NullableArray`\<`T`\> | Source collection, possibly nullish. |
| `predicate` | (`item`, `index`, `array`) => `boolean` | Receives the item, its index and the source array. |

#### Returns

`T` \| `undefined`

The last match, or `undefined`.

***

### flatMap()

```ts
flatMap<T, U>(array, transform): U[];
```

Defined in: [core/services/array.service.ts:207](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/array.service.ts#L207)

Maps each item to a collection and flattens one level. Returns `[]` for
nullish input.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t-8"></a> `T` | Source element type. |
| <a id="type-parameter-u"></a> `U` | Flattened element type. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `array` | `NullableArray`\<`T`\> | Source collection, possibly nullish. |
| `transform` | (`item`, `index`, `array`) => readonly `U`[] | Returns an iterable of `U` per item. |

#### Returns

`U`[]

A new flattened array.

***

### fromEntries()

```ts
fromEntries<K, V>(entries): Record<K, V>;
```

Defined in: [core/services/array.service.ts:320](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/array.service.ts#L320)

Typed `Object.fromEntries`. Returns `{}` for nullish input.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-k"></a> `K` *extends* `PropertyKey` | Key type. |
| <a id="type-parameter-v"></a> `V` | Value type. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `entries` | readonly (readonly \[`K`, `V`\])[] \| `null` \| `undefined` | Entry pairs, possibly nullish. |

#### Returns

`Record`\<`K`, `V`\>

A new record.

#### Example

```ts
fromEntries(products.map((p) => [p.id, p.name] as const));
```

***

### keys()

```ts
keys<T>(object): (keyof T)[];
```

Defined in: [core/services/array.service.ts:292](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/array.service.ts#L292)

Typed `Object.keys`. The native call returns `string[]`, losing the key
union of the object it was given.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t-9"></a> `T` *extends* `object` | Object type. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `object` | `T` \| `null` \| `undefined` | Source object, possibly nullish. |

#### Returns

(keyof `T`)[]

The object keys as a `keyof` array.

#### Example

```ts
keys(user); // ("id" | "name" | "email")[]
```

***

### map()

```ts
map<T, U>(array, transform): U[];
```

Defined in: [core/services/array.service.ts:190](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/array.service.ts#L190)

Projects every item through `transform`. Returns `[]` for nullish input.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t-10"></a> `T` | Source element type. |
| <a id="type-parameter-u-1"></a> `U` | Projected element type. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `array` | `NullableArray`\<`T`\> | Source collection, possibly nullish. |
| `transform` | (`item`, `index`, `array`) => `U` | Receives the item, its index and the source array. |

#### Returns

`U`[]

A new array of projected values.

***

### mapAsync()

```ts
mapAsync<T, U>(array, transform): Promise<U[]>;
```

Defined in: [core/services/array.service.ts:357](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/array.service.ts#L357)

Projects every item through an async transform, in parallel, preserving
input order.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t-11"></a> `T` | Source element type. |
| <a id="type-parameter-u-2"></a> `U` | Projected element type. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `array` | `NullableArray`\<`T`\> | Source collection, possibly nullish. |
| `transform` | (`item`, `index`) => `Promise`\<`U`\> | Async projection per item. |

#### Returns

`Promise`\<`U`[]\>

A promise of the projected values.

***

### partition()

```ts
partition<T>(array, predicate): [T[], T[]];
```

Defined in: [core/services/array.service.ts:159](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/array.service.ts#L159)

Splits the collection into `[matching, rest]`. Nullish input yields
`[[], []]`.

#### Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t-12"></a> `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `array` | `NullableArray`\<`T`\> | Source collection, possibly nullish. |
| `predicate` | (`item`, `index`, `array`) => `boolean` | Receives the item, its index and the source array. |

#### Returns

\[`T`[], `T`[]\]

A tuple of the matching items and the rest.

#### Example

```ts
const [inStock, soldOut] = partition(products, (p) => p.inStock);
```

***

### reduce()

```ts
reduce<T, U>(
   array, 
   reducer, 
   initial
): U;
```

Defined in: [core/services/array.service.ts:225](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/array.service.ts#L225)

Folds the collection into a single value. `initial` is required, so the
return type is unambiguous even for an empty or nullish collection.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t-13"></a> `T` | Source element type. |
| <a id="type-parameter-u-3"></a> `U` | Accumulator type. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `array` | `NullableArray`\<`T`\> | Source collection, possibly nullish. |
| `reducer` | (`accumulator`, `item`, `index`) => `U` | Receives the accumulator, the item and its index. |
| `initial` | `U` | Seed value. |

#### Returns

`U`

The accumulated value.

***

### reduceAsync()

```ts
reduceAsync<T, U>(
   array, 
   reducer, 
   initial
): Promise<U>;
```

Defined in: [core/services/array.service.ts:433](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/array.service.ts#L433)

Folds the collection with an async reducer, sequentially — a reduce that
ran in parallel could not be ordered.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t-14"></a> `T` | Source element type. |
| <a id="type-parameter-u-4"></a> `U` | Accumulator type. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `array` | `NullableArray`\<`T`\> | Source collection, possibly nullish. |
| `reducer` | (`accumulator`, `item`, `index`) => `Promise`\<`U`\> | Async step receiving the accumulator, the item and its index. |
| `initial` | `U` | Seed value. |

#### Returns

`Promise`\<`U`\>

A promise of the accumulated value.

***

### reverse()

```ts
reverse<T>(array): T[];
```

Defined in: [core/services/array.service.ts:271](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/array.service.ts#L271)

Returns a reversed **copy**. The native `reverse` mutates in place.

#### Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t-15"></a> `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `array` | `NullableArray`\<`T`\> | Source collection, possibly nullish. |

#### Returns

`T`[]

A new reversed array.

***

### some()

```ts
some<T>(array, predicate): boolean;
```

Defined in: [core/services/array.service.ts:123](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/array.service.ts#L123)

Returns `true` when at least one item satisfies `predicate`. Nullish input
is `false`, never `true`.

#### Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t-16"></a> `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `array` | `NullableArray`\<`T`\> | Source collection, possibly nullish. |
| `predicate` | (`item`, `index`, `array`) => `boolean` | Receives the item, its index and the source array. |

#### Returns

`boolean`

Whether any item matches.

***

### someAsync()

```ts
someAsync<T>(array, predicate): Promise<boolean>;
```

Defined in: [core/services/array.service.ts:392](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/array.service.ts#L392)

Returns `true` when at least one async predicate resolves truthy. Short
circuits on the first match.

#### Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t-17"></a> `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `array` | `NullableArray`\<`T`\> | Source collection, possibly nullish. |
| `predicate` | (`item`, `index`) => `Promise`\<`boolean`\> | Async test per item. |

#### Returns

`Promise`\<`boolean`\>

A promise of whether any item matches.

***

### sortBy()

```ts
sortBy<T>(
   array, 
   selector, 
   direction?
): T[];
```

Defined in: [core/services/array.service.ts:249](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/array.service.ts#L249)

Sorts a **copy** of the collection by a derived key. `Array.prototype.sort`
mutates in place, which would corrupt a shared array coming from a store
or a cache; this never does.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t-18"></a> `T` | Source element type. |

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `array` | `NullableArray`\<`T`\> | `undefined` | Source collection, possibly nullish. |
| `selector` | (`item`) => `string` \| `number` \| `bigint` \| `boolean` \| `Date` | `undefined` | Derives the comparable value from an item. |
| `direction?` | `"desc"` \| `"asc"` | `"asc"` | `"asc"` (default) or `"desc"`. |

#### Returns

`T`[]

A new sorted array.

#### Example

```ts
sortBy(products, (product) => product.price, "desc");
```

***

### values()

```ts
values<T>(object): T[keyof T][];
```

Defined in: [core/services/array.service.ts:303](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/array.service.ts#L303)

Typed `Object.values`. The native call returns `unknown[]`.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t-19"></a> `T` *extends* `object` | Object type. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `object` | `T` \| `null` \| `undefined` | Source object, possibly nullish. |

#### Returns

`T`\[keyof `T`\][]

The object values.

***

### getInstance()

```ts
static getInstance(): ArrayService;
```

Defined in: [core/services/array.service.ts:34](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/array.service.ts#L34)

#### Returns

`ArrayService`

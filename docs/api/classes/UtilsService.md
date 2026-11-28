[katanakit-js](../index.md) / UtilsService

# Class: UtilsService

Defined in: [core/services/utils.service.ts:9](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/utils.service.ts#L9)

UtilsService - Singleton para utilidades genéricas.

Aplica el patrón Singleton: una única instancia que centraliza utilidades
de arrays, objetos, tiempo y configuración. Puro, sin I/O, seguro para SSR.

## Methods

### onAverage()

```ts
onAverage(numbers): number;
```

Defined in: [core/services/utils.service.ts:348](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/utils.service.ts#L348)

Computes the arithmetic mean of an array of numbers. Returns `0` for an
empty array.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `numbers` | `number`[] | The input numbers. |

#### Returns

`number`

The arithmetic mean.

#### Example

```ts
average([1, 2, 3, 4, 5]); // 3
average([]);               // 0
```

***

### onChunk()

```ts
onChunk<T>(array, size): T[][];
```

Defined in: [core/services/utils.service.ts:55](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/utils.service.ts#L55)

Splits an array into chunks of the given size.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | Element type. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `array` | `T`[] | The input array. |
| `size` | `number` | Number of elements per chunk (must be > 0). |

#### Returns

`T`[][]

An array of chunks.

#### Throws

If `size` is less than or equal to 0.

#### Example

```ts
chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
chunk(["a", "b", "c"], 1);  // [["a"], ["b"], ["c"]]
```

***

### onCopyToClipboard()

```ts
onCopyToClipboard(text): Promise<boolean>;
```

Defined in: [core/services/utils.service.ts:280](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/utils.service.ts#L280)

Copies text to the clipboard (browser only). Returns `false` on failure
or in non-browser environments (SSR).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `text` | `string` | The text to copy. |

#### Returns

`Promise`\<`boolean`\>

`true` if the text was copied, `false` otherwise.

#### Example

```ts
const ok = await copyToClipboard("Hello, world!");
console.log(ok); // true (in a browser with clipboard API)
```

***

### onDeepClone()

```ts
onDeepClone<T>(value): T;
```

Defined in: [core/services/utils.service.ts:129](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/utils.service.ts#L129)

Deep clones a value using `structuredClone` with a JSON fallback for
environments that do not support it.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t-1"></a> `T` | Value type. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `T` | The value to clone. |

#### Returns

`T`

A deep copy of the value.

#### Example

```ts
const original = { a: { b: 1 } };
const copy = deepClone(original);
copy.a.b = 2;
original.a.b; // 1 (unchanged)
```

***

### onDeepMerge()

```ts
onDeepMerge<T>(target, source): T;
```

Defined in: [core/services/utils.service.ts:154](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/utils.service.ts#L154)

Deep merges `source` into a shallow copy of `target`. Nested plain
objects are merged recursively. Skips prototype-pollution keys
(`__proto__`, `constructor`, `prototype`).

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t-2"></a> `T` *extends* `Record`\<`string`, `unknown`\> | Target object type. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `target` | `T` | The base object (not mutated). |
| `source` | `Record`\<`string`, `unknown`\> | The object to merge in. |

#### Returns

`T`

A new merged object.

#### Example

```ts
const base = { a: 1, b: { c: 2, d: 3 } };
const override = { b: { c: 99, e: 4 }, f: 5 };
deepMerge(base, override);
// { a: 1, b: { c: 99, d: 3, e: 4 }, f: 5 }
```

***

### onGetUrlParams()

```ts
onGetUrlParams(urlString): Record<string, string>;
```

Defined in: [core/services/utils.service.ts:305](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/utils.service.ts#L305)

Parses query parameters from a URL string into a plain object.
Returns an empty object for invalid URLs.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `urlString` | `string` | The URL to parse. |

#### Returns

`Record`\<`string`, `string`\>

An object mapping parameter names to values.

#### Example

```ts
getUrlParams("https://example.com?q=hello&page=1");
// { q: "hello", page: "1" }
```

***

### onGroupBy()

```ts
onGroupBy<T>(array, key): Record<string, T[]>;
```

Defined in: [core/services/utils.service.ts:81](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/utils.service.ts#L81)

Groups array items by a key property or key selector function.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t-3"></a> `T` | Element type. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `array` | `T`[] | The input array. |
| `key` | keyof `T` \| ((`item`) => `string`) | A property name or a function that returns the group key. |

#### Returns

`Record`\<`string`, `T`[]\>

An object mapping group keys to arrays of items.

#### Example

```ts
const items = [
  { type: "fruit", name: "apple" },
  { type: "veggie", name: "carrot" },
  { type: "fruit", name: "banana" },
];
groupBy(items, "type");
// { fruit: [{ type: "fruit", name: "apple" }, { type: "fruit", name: "banana" }], veggie: [...] }
```

***

### onIsObject()

```ts
onIsObject(item): item is Record<string, unknown>;
```

Defined in: [core/services/utils.service.ts:109](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/utils.service.ts#L109)

Type guard that checks whether a value is a plain object (not null, not
an array).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `item` | `unknown` | The value to test. |

#### Returns

`item is Record<string, unknown>`

`true` if the value is a plain `Record<string, unknown>`.

#### Example

```ts
isObject({ a: 1 });       // true
isObject([1, 2]);          // false
isObject(null);            // false
```

***

### onOmit()

```ts
onOmit<T, K>(obj, keys): Omit<T, K>;
```

Defined in: [core/services/utils.service.ts:216](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/utils.service.ts#L216)

Omits the listed keys from an object, returning a shallow copy without
them. Shallow on purpose to avoid `structuredClone` failures on
non-cloneable values.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t-4"></a> `T` *extends* `object` | Source object type. |
| <a id="type-parameter-k"></a> `K` *extends* `string` \| `number` \| `symbol` | Keys to omit. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `obj` | `T` | The source object. |
| `keys` | `K`[] | Array of keys to exclude. |

#### Returns

`Omit`\<`T`, `K`\>

A new object without the omitted keys.

#### Example

```ts
const user = { id: 1, name: "Alice", password: "secret" };
omit(user, ["password"]); // { id: 1, name: "Alice" }
```

***

### onPick()

```ts
onPick<T, K>(obj, keys): Pick<T, K>;
```

Defined in: [core/services/utils.service.ts:189](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/utils.service.ts#L189)

Picks the listed keys from an object into a new object.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t-5"></a> `T` *extends* `object` | Source object type. |
| <a id="type-parameter-k-1"></a> `K` *extends* `string` \| `number` \| `symbol` | Keys to pick. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `obj` | `T` | The source object. |
| `keys` | `K`[] | Array of keys to include. |

#### Returns

`Pick`\<`T`, `K`\>

A new object with only the picked keys.

#### Example

```ts
const user = { id: 1, name: "Alice", email: "a@b.com" };
pick(user, ["id", "name"]); // { id: 1, name: "Alice" }
```

***

### onRetry()

```ts
onRetry<T>(
   fn, 
   retries?, 
   delayMs?
): Promise<T>;
```

Defined in: [core/services/utils.service.ts:257](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/utils.service.ts#L257)

Retries an async function with a fixed delay between attempts.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t-6"></a> `T` | The resolved value type. |

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `fn` | () => `Promise`\<`T`\> | `undefined` | The async function to retry. |
| `retries?` | `number` | `3` | Maximum number of retries (defaults to `3`). |
| `delayMs?` | `number` | `1000` | Delay between retries in milliseconds (defaults to `1000`). |

#### Returns

`Promise`\<`T`\>

The resolved value of `fn`.

#### Throws

The last error if all retries are exhausted.

#### Example

```ts
const data = await retry(() => fetch("/api").then(r => r.json()), 3, 500);
```

***

### onRound()

```ts
onRound(value, decimals?): number;
```

Defined in: [core/services/utils.service.ts:328](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/utils.service.ts#L328)

Rounds a number (or numeric string) to the specified number of decimal
places. Returns `0` for non-numeric input.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `value` | `string` \| `number` | `undefined` | The number or numeric string to round. |
| `decimals?` | `number` | `2` | Number of decimal places (defaults to `2`). |

#### Returns

`number`

The rounded number.

#### Example

```ts
round(3.14159, 2);   // 3.14
round("5.678", 1);   // 5.7
```

***

### onSleep()

```ts
onSleep(ms): Promise<void>;
```

Defined in: [core/services/utils.service.ts:238](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/utils.service.ts#L238)

Returns a promise that resolves after `ms` milliseconds.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `ms` | `number` | Delay in milliseconds. |

#### Returns

`Promise`\<`void`\>

A promise that resolves after the delay.

#### Example

```ts
await onSleep(1000); // waits 1 second
```

***

### onSplitConfig()

```ts
onSplitConfig<T>(input): {
  config: ConfigData<T>;
  methods: ConfigMethodEntries<T>;
};
```

Defined in: [core/services/utils.service.ts:376](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/utils.service.ts#L376)

Splits a `define*Config` literal into its config half (props and booleans)
and its method half (values declared with `function`).

Shared by every `define*Config` so they all read the same way: register
`config`, then return `{ config, ...methods }` as a `ConfigFacade`.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t-7"></a> `T` *extends* `object` | The literal passed to a `define*Config` call. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `T` | Object literal holding props, booleans and methods. |

#### Returns

```ts
{
  config: ConfigData<T>;
  methods: ConfigMethodEntries<T>;
}
```

The config entries and the method entries, split apart.

##### config

```ts
config: ConfigData<T>;
```

##### methods

```ts
methods: ConfigMethodEntries<T>;
```

#### Example

```ts
const { config, methods } = splitConfig({
  token: "abc",
  debug: true,
  send: async function () {},
});
// config  → { token: "abc", debug: true }
// methods → { send }
```

***

### onUnique()

```ts
onUnique<T>(array): T[];
```

Defined in: [core/services/utils.service.ts:36](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/utils.service.ts#L36)

Returns a new array with duplicate values removed, preserving first-seen order.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t-8"></a> `T` | Element type. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `array` | `T`[] | The input array. |

#### Returns

`T`[]

A new array with unique values.

#### Example

```ts
unique([1, 2, 2, 3, 1]); // [1, 2, 3]
unique(["a", "b", "a"]); // ["a", "b"]
```

***

### getInstance()

```ts
static getInstance(): UtilsService;
```

Defined in: [core/services/utils.service.ts:16](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/utils.service.ts#L16)

#### Returns

`UtilsService`

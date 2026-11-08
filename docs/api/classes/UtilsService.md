[katanakit-js](../index.md) / UtilsService

# Class: UtilsService

Defined in: [core/services/utils.service.ts:9](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/utils.service.ts#L9)

UtilsService - Singleton para utilidades genéricas.

Aplica el patrón Singleton: una única instancia que centraliza utilidades
de arrays, objetos, tiempo y configuración. Puro, sin I/O, seguro para SSR.

## Methods

### useAverage()

```ts
useAverage(numbers): number;
```

Defined in: [core/services/utils.service.ts:360](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/utils.service.ts#L360)

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
useAverage([1, 2, 3, 4, 5]); // 3
useAverage([]);               // 0
```

***

### useChunk()

```ts
useChunk<T>(array, size): T[][];
```

Defined in: [core/services/utils.service.ts:67](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/utils.service.ts#L67)

Splits an array into chunks of the given size.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | Element type. |

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
useChunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
useChunk(["a", "b", "c"], 1);  // [["a"], ["b"], ["c"]]
```

***

### useCopyToClipboard()

```ts
useCopyToClipboard(text): Promise<boolean>;
```

Defined in: [core/services/utils.service.ts:292](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/utils.service.ts#L292)

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
const ok = await useCopyToClipboard("Hello, world!");
console.log(ok); // true (in a browser with clipboard API)
```

***

### useDeepClone()

```ts
useDeepClone<T>(value): T;
```

Defined in: [core/services/utils.service.ts:141](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/utils.service.ts#L141)

Deep clones a value using `structuredClone` with a JSON fallback for
environments that do not support it.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | Value type. |

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
const copy = useDeepClone(original);
copy.a.b = 2;
original.a.b; // 1 (unchanged)
```

***

### useDeepMerge()

```ts
useDeepMerge<T>(target, source): T;
```

Defined in: [core/services/utils.service.ts:166](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/utils.service.ts#L166)

Deep merges `source` into a shallow copy of `target`. Nested plain
objects are merged recursively. Skips prototype-pollution keys
(`__proto__`, `constructor`, `prototype`).

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* `Record`\<`string`, `unknown`\> | Target object type. |

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
useDeepMerge(base, override);
// { a: 1, b: { c: 99, d: 3, e: 4 }, f: 5 }
```

***

### useGetUrlParams()

```ts
useGetUrlParams(urlString): Record<string, string>;
```

Defined in: [core/services/utils.service.ts:317](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/utils.service.ts#L317)

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
useGetUrlParams("https://example.com?q=hello&page=1");
// { q: "hello", page: "1" }
```

***

### useGroupBy()

```ts
useGroupBy<T>(array, key): Record<string, T[]>;
```

Defined in: [core/services/utils.service.ts:93](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/utils.service.ts#L93)

Groups array items by a key property or key selector function.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | Element type. |

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
useGroupBy(items, "type");
// { fruit: [{ type: "fruit", name: "apple" }, { type: "fruit", name: "banana" }], veggie: [...] }
```

***

### useIsObject()

```ts
useIsObject(item): item is Record<string, unknown>;
```

Defined in: [core/services/utils.service.ts:121](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/utils.service.ts#L121)

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
useIsObject({ a: 1 });       // true
useIsObject([1, 2]);          // false
useIsObject(null);            // false
```

***

### useOmit()

```ts
useOmit<T, K>(obj, keys): Omit<T, K>;
```

Defined in: [core/services/utils.service.ts:228](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/utils.service.ts#L228)

Omits the listed keys from an object, returning a shallow copy without
them. Shallow on purpose to avoid `structuredClone` failures on
non-cloneable values.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* `object` | Source object type. |
| `K` *extends* `string` \| `number` \| `symbol` | Keys to omit. |

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
useOmit(user, ["password"]); // { id: 1, name: "Alice" }
```

***

### usePick()

```ts
usePick<T, K>(obj, keys): Pick<T, K>;
```

Defined in: [core/services/utils.service.ts:201](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/utils.service.ts#L201)

Picks the listed keys from an object into a new object.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* `object` | Source object type. |
| `K` *extends* `string` \| `number` \| `symbol` | Keys to pick. |

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
usePick(user, ["id", "name"]); // { id: 1, name: "Alice" }
```

***

### useRetry()

```ts
useRetry<T>(
   fn, 
   retries?, 
   delayMs?
): Promise<T>;
```

Defined in: [core/services/utils.service.ts:269](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/utils.service.ts#L269)

Retries an async function with a fixed delay between attempts.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The resolved value type. |

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `fn` | () => `Promise`\<`T`\> | `undefined` | The async function to retry. |
| `retries` | `number` | `3` | Maximum number of retries (defaults to `3`). |
| `delayMs` | `number` | `1000` | Delay between retries in milliseconds (defaults to `1000`). |

#### Returns

`Promise`\<`T`\>

The resolved value of `fn`.

#### Throws

The last error if all retries are exhausted.

#### Example

```ts
const data = await useRetry(() => fetch("/api").then(r => r.json()), 3, 500);
```

***

### useRound()

```ts
useRound(value, decimals?): number;
```

Defined in: [core/services/utils.service.ts:340](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/utils.service.ts#L340)

Rounds a number (or numeric string) to the specified number of decimal
places. Returns `0` for non-numeric input.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `value` | `string` \| `number` | `undefined` | The number or numeric string to round. |
| `decimals` | `number` | `2` | Number of decimal places (defaults to `2`). |

#### Returns

`number`

The rounded number.

#### Example

```ts
useRound(3.14159, 2);   // 3.14
useRound("5.678", 1);   // 5.7
```

***

### useSleep()

```ts
useSleep(ms): Promise<void>;
```

Defined in: [core/services/utils.service.ts:250](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/utils.service.ts#L250)

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
await useSleep(1000); // waits 1 second
```

***

### useSplitConfig()

```ts
useSplitConfig<T>(input): {
  config: ConfigData<T>;
  methods: ConfigMethodEntries<T>;
};
```

Defined in: [core/services/utils.service.ts:388](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/utils.service.ts#L388)

Splits a `define*Config` literal into its config half (props and booleans)
and its method half (values declared with `function`).

Shared by every `define*Config` so they all read the same way: register
`config`, then return `{ config, ...methods }` as a `ConfigFacade`.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* `object` | The literal passed to a `define*Config` call. |

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
const { config, methods } = useSplitConfig({
  token: "abc",
  debug: true,
  send: async function () {},
});
// config  → { token: "abc", debug: true }
// methods → { send }
```

***

### useUnique()

```ts
useUnique<T>(array): T[];
```

Defined in: [core/services/utils.service.ts:48](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/utils.service.ts#L48)

Returns a new array with duplicate values removed, preserving first-seen order.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | Element type. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `array` | `T`[] | The input array. |

#### Returns

`T`[]

A new array with unique values.

#### Example

```ts
useUnique([1, 2, 2, 3, 1]); // [1, 2, 3]
useUnique(["a", "b", "a"]); // ["a", "b"]
```

***

### getInstance()

```ts
static getInstance(): UtilsService;
```

Defined in: [core/services/utils.service.ts:28](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/utils.service.ts#L28)

Obtiene la instancia única del UtilsService (Singleton).

#### Returns

`UtilsService`

La instancia única de UtilsService.

#### Example

```ts
const utils = UtilsService.getInstance();
utils.useUnique([1, 2, 2, 3, 1]);
```

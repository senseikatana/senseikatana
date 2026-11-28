[katanakit-js](../index.md) / onDeepMerge

# Variable: onDeepMerge

```ts
onDeepMerge: <T>(target, source) => T;
```

Defined in: [core/services/utils.service.ts:407](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/utils.service.ts#L407)

Deep merges `source` into a shallow copy of `target`. Nested plain
objects are merged recursively. Skips prototype-pollution keys
(`__proto__`, `constructor`, `prototype`).

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-__typet"></a> `T` *extends* `Record`\<`string`, `unknown`\> | Target object type. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `target` | `T` | The base object (not mutated). |
| `source` | `Record`\<`string`, `unknown`\> | The object to merge in. |

## Returns

`T`

A new merged object.

## Example

```ts
const base = { a: 1, b: { c: 2, d: 3 } };
const override = { b: { c: 99, e: 4 }, f: 5 };
deepMerge(base, override);
// { a: 1, b: { c: 99, d: 3, e: 4 }, f: 5 }
```

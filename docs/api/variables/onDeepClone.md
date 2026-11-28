[katanakit-js](../index.md) / onDeepClone

# Variable: onDeepClone

```ts
onDeepClone: <T>(value) => T;
```

Defined in: [core/services/utils.service.ts:406](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/utils.service.ts#L406)

Deep clones a value using `structuredClone` with a JSON fallback for
environments that do not support it.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-__typet"></a> `T` | Value type. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `T` | The value to clone. |

## Returns

`T`

A deep copy of the value.

## Example

```ts
const original = { a: { b: 1 } };
const copy = deepClone(original);
copy.a.b = 2;
original.a.b; // 1 (unchanged)
```

[katanakit-js](../index.md) / onUnique

# Variable: onUnique

```ts
onUnique: <T>(array) => T[];
```

Defined in: [core/services/utils.service.ts:402](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/utils.service.ts#L402)

Returns a new array with duplicate values removed, preserving first-seen order.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-__typet"></a> `T` | Element type. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `array` | `T`[] | The input array. |

## Returns

`T`[]

A new array with unique values.

## Example

```ts
unique([1, 2, 2, 3, 1]); // [1, 2, 3]
unique(["a", "b", "a"]); // ["a", "b"]
```

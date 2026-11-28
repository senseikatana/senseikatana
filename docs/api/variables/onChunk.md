[katanakit-js](../index.md) / onChunk

# Variable: onChunk

```ts
onChunk: <T>(array, size) => T[][];
```

Defined in: [core/services/utils.service.ts:403](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/utils.service.ts#L403)

Splits an array into chunks of the given size.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-__typet"></a> `T` | Element type. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `array` | `T`[] | The input array. |
| `size` | `number` | Number of elements per chunk (must be > 0). |

## Returns

`T`[][]

An array of chunks.

## Throws

If `size` is less than or equal to 0.

## Example

```ts
chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
chunk(["a", "b", "c"], 1);  // [["a"], ["b"], ["c"]]
```

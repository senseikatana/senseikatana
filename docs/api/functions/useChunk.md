[katanakit-js](../index.md) / useChunk

# Function: useChunk()

```ts
function useChunk<T>(array, size): T[][];
```

Defined in: [core/services/utils.service.ts:434](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/utils.service.ts#L434)

Splits an array into chunks of the given size.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `array` | `T`[] |
| `size` | `number` |

## Returns

`T`[][]

## Example

```ts
useChunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
```

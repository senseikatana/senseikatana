[katanakit-js](../index.md) / useUnique

# Function: useUnique()

```ts
function useUnique<T>(array): T[];
```

Defined in: [core/services/utils.service.ts:422](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/utils.service.ts#L422)

Returns a new array with duplicate values removed, preserving first-seen order.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `array` | `T`[] |

## Returns

`T`[]

## Example

```ts
useUnique([1, 2, 2, 3, 1]); // [1, 2, 3]
```

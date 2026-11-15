[katanakit-js](../index.md) / useSortBy

# Function: useSortBy()

```ts
function useSortBy<T>(
   array, 
   selector, 
   direction?
): T[];
```

Defined in: [core/services/array.service.ts:514](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/array.service.ts#L514)

Sorts a copy by a derived key. See [ArrayService.useSortBy](../classes/ArrayService.md#usesortby).

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |

## Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `array` | `NullableArray`\<`T`\> | `undefined` |
| `selector` | (`item`) => `string` \| `number` \| `bigint` \| `boolean` \| `Date` | `undefined` |
| `direction?` | `"desc"` \| `"asc"` | `"asc"` |

## Returns

`T`[]

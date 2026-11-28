[katanakit-js](../index.md) / useSortBy

# Function: useSortBy()

```ts
function useSortBy<T>(
   array, 
   selector, 
   direction?
): T[];
```

Defined in: [core/services/array.service.ts:514](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/core/services/array.service.ts#L514)

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

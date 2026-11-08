[katanakit-js](../index.md) / useSortBy

# Function: useSortBy()

```ts
function useSortBy<T>(
   array, 
   selector, 
   direction?
): T[];
```

Defined in: [core/services/array.service.ts:514](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/array.service.ts#L514)

Sorts a copy by a derived key. See [ArrayService.useSortBy](../classes/ArrayService.md#usesortby).

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `array` | `NullableArray`\<`T`\> | `undefined` |
| `selector` | (`item`) => `string` \| `number` \| `bigint` \| `boolean` \| `Date` | `undefined` |
| `direction` | `"desc"` \| `"asc"` | `"asc"` |

## Returns

`T`[]

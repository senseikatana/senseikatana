[katanakit-js](../index.md) / useFlatMap

# Function: useFlatMap()

```ts
function useFlatMap<T, U>(array, transform): U[];
```

Defined in: [core/services/array.service.ts:497](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/array.service.ts#L497)

Maps to collections and flattens one level. See [ArrayService.useFlatMap](../classes/ArrayService.md#useflatmap).

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |
| <a id="type-parameter-u"></a> `U` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `array` | `NullableArray`\<`T`\> |
| `transform` | (`item`, `index`, `array`) => readonly `U`[] |

## Returns

`U`[]

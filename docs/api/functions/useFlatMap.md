[katanakit-js](../index.md) / useFlatMap

# Function: useFlatMap()

```ts
function useFlatMap<T, U>(array, transform): U[];
```

Defined in: [core/services/array.service.ts:497](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/array.service.ts#L497)

Maps to collections and flattens one level. See [ArrayService.useFlatMap](../classes/ArrayService.md#useflatmap).

## Type Parameters

| Type Parameter |
| ------ |
| `T` |
| `U` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `array` | `NullableArray`\<`T`\> |
| `transform` | (`item`, `index`, `array`) => readonly `U`[] |

## Returns

`U`[]

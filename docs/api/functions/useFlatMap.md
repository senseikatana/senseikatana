[katanakit-js](../index.md) / useFlatMap

# Function: useFlatMap()

```ts
function useFlatMap<T, U>(array, transform): U[];
```

Defined in: [core/services/array.service.ts:497](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/core/services/array.service.ts#L497)

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

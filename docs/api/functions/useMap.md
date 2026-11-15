[katanakit-js](../index.md) / useMap

# Function: useMap()

```ts
function useMap<T, U>(array, transform): U[];
```

Defined in: [core/services/array.service.ts:489](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/array.service.ts#L489)

Projects every item. See [ArrayService.useMap](../classes/ArrayService.md#usemap).

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |
| <a id="type-parameter-u"></a> `U` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `array` | `NullableArray`\<`T`\> |
| `transform` | (`item`, `index`, `array`) => `U` |

## Returns

`U`[]

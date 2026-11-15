[katanakit-js](../index.md) / useMap

# Function: useMap()

```ts
function useMap<T, U>(array, transform): U[];
```

Defined in: [core/services/array.service.ts:489](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/array.service.ts#L489)

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

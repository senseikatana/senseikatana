[katanakit-js](../index.md) / useMap

# Function: useMap()

```ts
function useMap<T, U>(array, transform): U[];
```

Defined in: [core/services/array.service.ts:489](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/array.service.ts#L489)

Projects every item. See [ArrayService.useMap](../classes/ArrayService.md#usemap).

## Type Parameters

| Type Parameter |
| ------ |
| `T` |
| `U` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `array` | `NullableArray`\<`T`\> |
| `transform` | (`item`, `index`, `array`) => `U` |

## Returns

`U`[]

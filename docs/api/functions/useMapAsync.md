[katanakit-js](../index.md) / useMapAsync

# Function: useMapAsync()

```ts
function useMapAsync<T, U>(array, transform): Promise<U[]>;
```

Defined in: [core/services/array.service.ts:553](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/array.service.ts#L553)

Async map, in parallel. See [ArrayService.useMapAsync](../classes/ArrayService.md#usemapasync).

## Type Parameters

| Type Parameter |
| ------ |
| `T` |
| `U` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `array` | `NullableArray`\<`T`\> |
| `transform` | (`item`, `index`) => `Promise`\<`U`\> |

## Returns

`Promise`\<`U`[]\>

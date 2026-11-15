[katanakit-js](../index.md) / useMapAsync

# Function: useMapAsync()

```ts
function useMapAsync<T, U>(array, transform): Promise<U[]>;
```

Defined in: [core/services/array.service.ts:553](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/array.service.ts#L553)

Async map, in parallel. See [ArrayService.useMapAsync](../classes/ArrayService.md#usemapasync).

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |
| <a id="type-parameter-u"></a> `U` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `array` | `NullableArray`\<`T`\> |
| `transform` | (`item`, `index`) => `Promise`\<`U`\> |

## Returns

`Promise`\<`U`[]\>

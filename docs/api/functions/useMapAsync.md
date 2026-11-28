[katanakit-js](../index.md) / useMapAsync

# Function: useMapAsync()

```ts
function useMapAsync<T, U>(array, transform): Promise<U[]>;
```

Defined in: [core/services/array.service.ts:553](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/core/services/array.service.ts#L553)

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

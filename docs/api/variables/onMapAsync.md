[katanakit-js](../index.md) / onMapAsync

# Variable: onMapAsync

```ts
onMapAsync: <T, U>(array, transform) => Promise<U[]>;
```

Defined in: [core/services/array.service.ts:464](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/array.service.ts#L464)

Projects every item through an async transform, in parallel, preserving
input order.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-__typet"></a> `T` | Source element type. |
| <a id="type-parameter-__typeu"></a> `U` | Projected element type. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `array` | `NullableArray`\<`T`\> | Source collection, possibly nullish. |
| `transform` | (`item`, `index`) => `Promise`\<`U`\> | Async projection per item. |

## Returns

`Promise`\<`U`[]\>

A promise of the projected values.

[katanakit-js](../index.md) / onReverse

# Variable: onReverse

```ts
onReverse: <T>(array) => T[];
```

Defined in: [core/services/array.service.ts:459](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/array.service.ts#L459)

Returns a reversed **copy**. The native `reverse` mutates in place.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-__typet"></a> `T` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `array` | `NullableArray`\<`T`\> | Source collection, possibly nullish. |

## Returns

`T`[]

A new reversed array.

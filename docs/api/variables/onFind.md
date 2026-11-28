[katanakit-js](../index.md) / onFind

# Variable: onFind

```ts
onFind: <T>(array, predicate) => T | undefined;
```

Defined in: [core/services/array.service.ts:449](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/array.service.ts#L449)

Returns the first item satisfying `predicate`, or `undefined`.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-__typet"></a> `T` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `array` | `NullableArray`\<`T`\> | Source collection, possibly nullish. |
| `predicate` | (`item`, `index`, `array`) => `boolean` | Receives the item, its index and the source array. |

## Returns

`T` \| `undefined`

The first match, or `undefined`.

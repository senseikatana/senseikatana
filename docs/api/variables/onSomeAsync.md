[katanakit-js](../index.md) / onSomeAsync

# Variable: onSomeAsync

```ts
onSomeAsync: <T>(array, predicate) => Promise<boolean>;
```

Defined in: [core/services/array.service.ts:466](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/array.service.ts#L466)

Returns `true` when at least one async predicate resolves truthy. Short
circuits on the first match.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-__typet"></a> `T` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `array` | `NullableArray`\<`T`\> | Source collection, possibly nullish. |
| `predicate` | (`item`, `index`) => `Promise`\<`boolean`\> | Async test per item. |

## Returns

`Promise`\<`boolean`\>

A promise of whether any item matches.

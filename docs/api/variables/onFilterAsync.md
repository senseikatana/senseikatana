[katanakit-js](../index.md) / onFilterAsync

# Variable: onFilterAsync

```ts
onFilterAsync: <T>(array, predicate) => Promise<T[]>;
```

Defined in: [core/services/array.service.ts:463](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/array.service.ts#L463)

Keeps the items whose async predicate resolves truthy. Every predicate runs
in parallel and the input order is preserved.

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

`Promise`\<`T`[]\>

A promise of the matching items.

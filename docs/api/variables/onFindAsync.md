[katanakit-js](../index.md) / onFindAsync

# Variable: onFindAsync

```ts
onFindAsync: <T>(array, predicate) => Promise<T | undefined>;
```

Defined in: [core/services/array.service.ts:465](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/array.service.ts#L465)

Returns the first item whose async predicate resolves truthy. Short
circuits: later predicates are never invoked.

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

`Promise`\<`T` \| `undefined`\>

A promise of the first match, or `undefined`.

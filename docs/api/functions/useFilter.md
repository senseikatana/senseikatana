[katanakit-js](../index.md) / useFilter

# Function: useFilter()

```ts
function useFilter<T>(array, predicate): T[];
```

Defined in: [core/services/array.service.ts:454](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/array.service.ts#L454)

Keeps the items that satisfy `predicate`. See [ArrayService.useFilter](../classes/ArrayService.md#usefilter).

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `array` | `NullableArray`\<`T`\> |
| `predicate` | `Predicate`\<`T`\> |

## Returns

`T`[]

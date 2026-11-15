[katanakit-js](../index.md) / useFilter

# Function: useFilter()

```ts
function useFilter<T>(array, predicate): T[];
```

Defined in: [core/services/array.service.ts:454](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/array.service.ts#L454)

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

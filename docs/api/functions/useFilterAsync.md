[katanakit-js](../index.md) / useFilterAsync

# Function: useFilterAsync()

```ts
function useFilterAsync<T>(array, predicate): Promise<T[]>;
```

Defined in: [core/services/array.service.ts:545](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/array.service.ts#L545)

Async filter, in parallel. See [ArrayService.useFilterAsync](../classes/ArrayService.md#usefilterasync).

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `array` | `NullableArray`\<`T`\> |
| `predicate` | `AsyncPredicate`\<`T`\> |

## Returns

`Promise`\<`T`[]\>

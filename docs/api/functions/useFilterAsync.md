[katanakit-js](../index.md) / useFilterAsync

# Function: useFilterAsync()

```ts
function useFilterAsync<T>(array, predicate): Promise<T[]>;
```

Defined in: [core/services/array.service.ts:545](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/array.service.ts#L545)

Async filter, in parallel. See [ArrayService.useFilterAsync](../classes/ArrayService.md#usefilterasync).

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `array` | `NullableArray`\<`T`\> |
| `predicate` | `AsyncPredicate`\<`T`\> |

## Returns

`Promise`\<`T`[]\>

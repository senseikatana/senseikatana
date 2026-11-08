[katanakit-js](../index.md) / usePartition

# Function: usePartition()

```ts
function usePartition<T>(array, predicate): [T[], T[]];
```

Defined in: [core/services/array.service.ts:484](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/array.service.ts#L484)

Splits into `[matching, rest]`. See [ArrayService.usePartition](../classes/ArrayService.md#usepartition).

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `array` | `NullableArray`\<`T`\> |
| `predicate` | `Predicate`\<`T`\> |

## Returns

\[`T`[], `T`[]\]

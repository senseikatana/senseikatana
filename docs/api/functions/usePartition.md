[katanakit-js](../index.md) / usePartition

# Function: usePartition()

```ts
function usePartition<T>(array, predicate): [T[], T[]];
```

Defined in: [core/services/array.service.ts:484](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/array.service.ts#L484)

Splits into `[matching, rest]`. See [ArrayService.usePartition](../classes/ArrayService.md#usepartition).

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

\[`T`[], `T`[]\]

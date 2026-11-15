[katanakit-js](../index.md) / usePartition

# Function: usePartition()

```ts
function usePartition<T>(array, predicate): [T[], T[]];
```

Defined in: [core/services/array.service.ts:484](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/array.service.ts#L484)

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

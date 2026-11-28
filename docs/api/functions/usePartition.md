[katanakit-js](../index.md) / usePartition

# Function: usePartition()

```ts
function usePartition<T>(array, predicate): [T[], T[]];
```

Defined in: [core/services/array.service.ts:484](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/core/services/array.service.ts#L484)

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

[katanakit-js](../index.md) / useFindLast

# Function: useFindLast()

```ts
function useFindLast<T>(array, predicate): T | undefined;
```

Defined in: [core/services/array.service.ts:464](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/array.service.ts#L464)

Returns the last matching item, or `undefined`. See [ArrayService.useFindLast](../classes/ArrayService.md#usefindlast).

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

`T` \| `undefined`

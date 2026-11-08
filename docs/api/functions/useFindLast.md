[katanakit-js](../index.md) / useFindLast

# Function: useFindLast()

```ts
function useFindLast<T>(array, predicate): T | undefined;
```

Defined in: [core/services/array.service.ts:464](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/array.service.ts#L464)

Returns the last matching item, or `undefined`. See [ArrayService.useFindLast](../classes/ArrayService.md#usefindlast).

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

`T` \| `undefined`

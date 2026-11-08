[katanakit-js](../index.md) / useFind

# Function: useFind()

```ts
function useFind<T>(array, predicate): T | undefined;
```

Defined in: [core/services/array.service.ts:459](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/array.service.ts#L459)

Returns the first matching item, or `undefined`. See [ArrayService.useFind](../classes/ArrayService.md#usefind).

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

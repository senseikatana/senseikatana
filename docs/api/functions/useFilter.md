[katanakit-js](../index.md) / useFilter

# Function: useFilter()

```ts
function useFilter<T>(array, predicate): T[];
```

Defined in: [core/services/array.service.ts:454](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/core/services/array.service.ts#L454)

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

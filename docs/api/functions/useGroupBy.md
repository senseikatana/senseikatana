[katanakit-js](../index.md) / useGroupBy

# Function: useGroupBy()

```ts
function useGroupBy<T>(array, key): Record<string, T[]>;
```

Defined in: [core/services/utils.service.ts:446](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/utils.service.ts#L446)

Groups array items by a key property or key selector function.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `array` | `T`[] |
| `key` | keyof `T` \| ((`item`) => `string`) |

## Returns

`Record`\<`string`, `T`[]\>

## Example

```ts
useGroupBy(items, "type");
```

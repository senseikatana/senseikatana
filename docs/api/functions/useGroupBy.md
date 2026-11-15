[katanakit-js](../index.md) / useGroupBy

# Function: useGroupBy()

```ts
function useGroupBy<T>(array, key): Record<string, T[]>;
```

Defined in: [core/services/utils.service.ts:446](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/utils.service.ts#L446)

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

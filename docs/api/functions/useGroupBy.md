[katanakit-js](../index.md) / useGroupBy

# Function: useGroupBy()

```ts
function useGroupBy<T>(array, key): Record<string, T[]>;
```

Defined in: [core/services/utils.service.ts:446](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/utils.service.ts#L446)

Groups array items by a key property or key selector function.

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

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

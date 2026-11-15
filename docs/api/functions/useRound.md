[katanakit-js](../index.md) / useRound

# Function: useRound()

```ts
function useRound(value, decimals?): number;
```

Defined in: [core/services/utils.service.ts:572](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/utils.service.ts#L572)

Rounds a number (or numeric string) to the specified number of decimal places.

## Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `value` | `string` \| `number` | `undefined` |
| `decimals?` | `number` | `2` |

## Returns

`number`

## Example

```ts
useRound(3.14159, 2); // 3.14
```

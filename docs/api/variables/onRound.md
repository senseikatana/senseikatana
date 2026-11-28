[katanakit-js](../index.md) / onRound

# Variable: onRound

```ts
onRound: (value, decimals) => number;
```

Defined in: [core/services/utils.service.ts:400](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/utils.service.ts#L400)

Rounds a number (or numeric string) to the specified number of decimal
places. Returns `0` for non-numeric input.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `value` | `string` \| `number` | `undefined` | The number or numeric string to round. |
| `decimals?` | `number` | `2` | Number of decimal places (defaults to `2`). |

## Returns

`number`

The rounded number.

## Example

```ts
round(3.14159, 2);   // 3.14
round("5.678", 1);   // 5.7
```

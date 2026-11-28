[katanakit-js](../index.md) / onAverage

# Variable: onAverage

```ts
onAverage: (numbers) => number;
```

Defined in: [core/services/utils.service.ts:399](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/utils.service.ts#L399)

Computes the arithmetic mean of an array of numbers. Returns `0` for an
empty array.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `numbers` | `number`[] | The input numbers. |

## Returns

`number`

The arithmetic mean.

## Example

```ts
average([1, 2, 3, 4, 5]); // 3
average([]);               // 0
```

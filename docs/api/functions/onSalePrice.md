[katanakit-js](../index.md) / onSalePrice

# Function: onSalePrice()

```ts
function onSalePrice(options): SalePrice;
```

Defined in: [core/services/formatter.service.ts:271](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/formatter.service.ts#L271)

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | \{ `discount`: `number`; `price`: `number`; \} | - |
| `options.discount?` | `number` | Discount rate: percentage when `> 1` (e.g. `40` → 40%), or decimal fraction when in `(0, 1]` (e.g. `0.4` → 40%). Same convention as `taxes`. |
| `options.price?` | `number` | Regular price, before the discount. |

## Returns

[`SalePrice`](../interfaces/SalePrice.md)

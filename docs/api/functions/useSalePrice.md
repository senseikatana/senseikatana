[katanakit-js](../index.md) / useSalePrice

# Function: useSalePrice()

```ts
function useSalePrice(options): SalePrice;
```

Defined in: [core/services/formatter.service.ts:277](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/formatter.service.ts#L277)

Applies a discount and reports it. See [FormatterService.useSalePrice](../classes/FormatterService.md#usesaleprice).

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | \{ `discount`: `number`; `price`: `number`; \} | - |
| `options.discount` | `number` | Discount rate: percentage when `> 1` (e.g. `40` → 40%), or decimal fraction when in `(0, 1]` (e.g. `0.4` → 40%). Same convention as `taxes`. |
| `options.price` | `number` | Regular price, before the discount. |

## Returns

[`SalePrice`](../interfaces/SalePrice.md)

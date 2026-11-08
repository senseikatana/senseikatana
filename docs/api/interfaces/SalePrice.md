[katanakit-js](../index.md) / SalePrice

# Interface: SalePrice

Defined in: [types/core/currency.ts:34](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/currency.ts#L34)

Result of [useSalePrice](../functions/useSalePrice.md): the regular price, the discounted price and the rounded percentage taken off.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="percentoff"></a> `percentOff` | `number` | Percentage taken off, rounded to two decimals (e.g. `40`, `12.5`). | [types/core/currency.ts:40](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/currency.ts#L40) |
| <a id="price"></a> `price` | `number` | Regular price, echoed back for display. | [types/core/currency.ts:36](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/currency.ts#L36) |
| <a id="saleprice"></a> `salePrice` | `number` | Price after the discount, unrounded — let the currency formatter own the digits. | [types/core/currency.ts:38](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/currency.ts#L38) |

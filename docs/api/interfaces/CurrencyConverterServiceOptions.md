[katanakit-js](../index.md) / CurrencyConverterServiceOptions

# Interface: CurrencyConverterServiceOptions

Defined in: [types/core/currency-conversion.ts:44](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/currency-conversion.ts#L44)

Wiring options for [CurrencyConverterService](../classes/CurrencyConverterService.md) (dependency injection).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="pivot"></a> `pivot?` | \| `"USD"` \| `"EUR"` \| `"GBP"` \| `"JPY"` \| `"CHF"` \| `"CAD"` \| `"AUD"` \| `"NZD"` \| `"MXN"` \| `"BRL"` \| `"ARS"` \| `"COP"` \| `"CLP"` \| `"SEK"` \| `"NOK"` \| `"DKK"` \| `"PLN"` \| `"CZK"` \| `"HUF"` \| `"RON"` \| `"TRY"` \| `"ISK"` \| `"CNY"` \| `"HKD"` \| `"SGD"` \| `"INR"` \| `"KRW"` \| `"THB"` \| `"IDR"` \| `"MYR"` \| `"PHP"` \| `"ILS"` \| `"ZAR"` | Currency every rate is quoted against before a pair is resolved by division. Defaults to `"USD"`. Sources round their quotes (Frankfurter keeps 5 decimal places), so a small quote such as `KRW → USD` is starved of significant digits. Quoting everything against one pivot and dividing keeps the precision on the side of the pair that is well conditioned. | [types/core/currency-conversion.ts:58](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/currency-conversion.ts#L58) |
| <a id="provider"></a> `provider?` | [`ICurrencyRateProvider`](ICurrencyRateProvider.md) | Rate source. Defaults to the service's own provider. | [types/core/currency-conversion.ts:46](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/currency-conversion.ts#L46) |
| <a id="ttlms"></a> `ttlMs?` | `number` | Cache time-to-live in milliseconds. Defaults to 10 minutes. | [types/core/currency-conversion.ts:48](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/currency-conversion.ts#L48) |

[katanakit-js](../index.md) / CurrencyConvertOptionsSchema

# Variable: CurrencyConvertOptionsSchema

```ts
const CurrencyConvertOptionsSchema: ZodObject<{
  amount: ZodNumber;
  from: ZodEnum<{
     ARS: "ARS";
     AUD: "AUD";
     BRL: "BRL";
     CAD: "CAD";
     CHF: "CHF";
     CLP: "CLP";
     CNY: "CNY";
     COP: "COP";
     CZK: "CZK";
     DKK: "DKK";
     EUR: "EUR";
     GBP: "GBP";
     HKD: "HKD";
     HUF: "HUF";
     IDR: "IDR";
     ILS: "ILS";
     INR: "INR";
     ISK: "ISK";
     JPY: "JPY";
     KRW: "KRW";
     MXN: "MXN";
     MYR: "MYR";
     NOK: "NOK";
     NZD: "NZD";
     PHP: "PHP";
     PLN: "PLN";
     RON: "RON";
     SEK: "SEK";
     SGD: "SGD";
     THB: "THB";
     TRY: "TRY";
     USD: "USD";
     ZAR: "ZAR";
  }>;
  to: ZodEnum<{
     ARS: "ARS";
     AUD: "AUD";
     BRL: "BRL";
     CAD: "CAD";
     CHF: "CHF";
     CLP: "CLP";
     CNY: "CNY";
     COP: "COP";
     CZK: "CZK";
     DKK: "DKK";
     EUR: "EUR";
     GBP: "GBP";
     HKD: "HKD";
     HUF: "HUF";
     IDR: "IDR";
     ILS: "ILS";
     INR: "INR";
     ISK: "ISK";
     JPY: "JPY";
     KRW: "KRW";
     MXN: "MXN";
     MYR: "MYR";
     NOK: "NOK";
     NZD: "NZD";
     PHP: "PHP";
     PLN: "PLN";
     RON: "RON";
     SEK: "SEK";
     SGD: "SGD";
     THB: "THB";
     TRY: "TRY";
     USD: "USD";
     ZAR: "ZAR";
  }>;
}, $strip>;
```

Defined in: [schemas/core.schema.ts:71](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/core.schema.ts#L71)

Options for a currency conversion between two ISO currencies.

[katanakit-js](../index.md) / CurrencyConversionSchema

# Variable: CurrencyConversionSchema

```ts
const CurrencyConversionSchema: ZodObject<{
  amount: ZodNumber;
  converted: ZodNumber;
  date: ZodString;
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
  rate: ZodNumber;
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

Defined in: [schemas/core.schema.ts:98](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/core.schema.ts#L98)

Result of a conversion: the math plus the rate and date it came from.

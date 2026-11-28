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

Defined in: [schemas/core.schema.ts:95](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/core.schema.ts#L95)

Result of a conversion: the math plus the rate and date it came from.

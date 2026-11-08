[katanakit-js](../index.md) / CurrencyFormatOptionsSchema

# Variable: CurrencyFormatOptionsSchema

```ts
const CurrencyFormatOptionsSchema: ZodObject<{
  amount: ZodNumber;
  currency: ZodOptional<ZodEnum<{
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
  }>>;
  digits: ZodOptional<ZodNumber>;
  locale: ZodOptional<ZodEnum<{
     de: "de";
     en: "en";
     es: "es";
     fr: "fr";
     it: "it";
     ja: "ja";
     pt: "pt";
     zh: "zh";
  }>>;
  taxes: ZodOptional<ZodNumber>;
}, $strip>;
```

Defined in: [schemas/core.schema.ts:56](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/core.schema.ts#L56)

Options for currency formatting.

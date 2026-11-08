[katanakit-js](../index.md) / NumberFormatOptionsSchema

# Variable: NumberFormatOptionsSchema

```ts
const NumberFormatOptionsSchema: ZodObject<{
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
}, $strip>;
```

Defined in: [schemas/core.schema.ts:128](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/core.schema.ts#L128)

Options for plain number formatting.

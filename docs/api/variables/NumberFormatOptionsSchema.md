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

Defined in: [schemas/core.schema.ts:128](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/core.schema.ts#L128)

Options for plain number formatting.

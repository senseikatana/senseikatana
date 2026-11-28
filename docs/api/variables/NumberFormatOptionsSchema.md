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

Defined in: [schemas/core.schema.ts:119](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/core.schema.ts#L119)

Options for plain number formatting.

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

Defined in: [schemas/core.schema.ts:128](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/core.schema.ts#L128)

Options for plain number formatting.

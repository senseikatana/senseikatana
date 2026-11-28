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

Defined in: [schemas/core.schema.ts:128](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/core.schema.ts#L128)

Options for plain number formatting.

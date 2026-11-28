[katanakit-js](../index.md) / AppDateFormatOptionsSchema

# Variable: AppDateFormatOptionsSchema

```ts
const AppDateFormatOptionsSchema: ZodObject<{
  day: ZodOptional<ZodEnum<{
     "2-digit": "2-digit";
     numeric: "numeric";
  }>>;
  month: ZodOptional<ZodEnum<{
     "2-digit": "2-digit";
     long: "long";
     narrow: "narrow";
     numeric: "numeric";
     short: "short";
  }>>;
  year: ZodOptional<ZodEnum<{
     "2-digit": "2-digit";
     numeric: "numeric";
  }>>;
}, $strip>;
```

Defined in: [schemas/core.schema.ts:125](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/core.schema.ts#L125)

Date format parts (subset of `Intl.DateTimeFormatOptions`).

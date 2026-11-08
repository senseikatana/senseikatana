[katanakit-js](../index.md) / AppDateFormatOptionsSchema

# Variable: AppDateFormatOptionsSchema

```ts
const AppDateFormatOptionsSchema: ZodObject<{
  day: ZodOptional<ZodEnum<{
     2-digit: "2-digit";
     numeric: "numeric";
  }>>;
  month: ZodOptional<ZodEnum<{
     2-digit: "2-digit";
     long: "long";
     narrow: "narrow";
     numeric: "numeric";
     short: "short";
  }>>;
  year: ZodOptional<ZodEnum<{
     2-digit: "2-digit";
     numeric: "numeric";
  }>>;
}, $strip>;
```

Defined in: [schemas/core.schema.ts:134](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/core.schema.ts#L134)

Date format parts (subset of `Intl.DateTimeFormatOptions`).

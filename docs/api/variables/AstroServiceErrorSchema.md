[katanakit-js](../index.md) / AstroServiceErrorSchema

# Variable: AstroServiceErrorSchema

```ts
const AstroServiceErrorSchema: ZodObject<{
  collectionName: ZodOptional<ZodString>;
  details: ZodOptional<ZodUnknown>;
  message: ZodString;
}, $strip>;
```

Defined in: [schemas/core.schema.ts:227](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/core.schema.ts#L227)

Error shape for Astro content operations.

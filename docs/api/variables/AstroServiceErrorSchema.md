[katanakit-js](../index.md) / AstroServiceErrorSchema

# Variable: AstroServiceErrorSchema

```ts
const AstroServiceErrorSchema: ZodObject<{
  collectionName: ZodOptional<ZodString>;
  details: ZodOptional<ZodUnknown>;
  message: ZodString;
}, $strip>;
```

Defined in: [schemas/core.schema.ts:227](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/core.schema.ts#L227)

Error shape for Astro content operations.

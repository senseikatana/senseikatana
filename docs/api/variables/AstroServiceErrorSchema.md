[katanakit-js](../index.md) / AstroServiceErrorSchema

# Variable: AstroServiceErrorSchema

```ts
const AstroServiceErrorSchema: ZodObject<{
  collectionName: ZodOptional<ZodString>;
  details: ZodOptional<ZodUnknown>;
  message: ZodString;
}, $strip>;
```

Defined in: [schemas/core.schema.ts:218](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/core.schema.ts#L218)

Error shape for Astro content operations.

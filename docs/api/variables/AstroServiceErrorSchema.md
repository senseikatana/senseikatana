[katanakit-js](../index.md) / AstroServiceErrorSchema

# Variable: AstroServiceErrorSchema

```ts
const AstroServiceErrorSchema: ZodObject<{
  collectionName: ZodOptional<ZodString>;
  details: ZodOptional<ZodUnknown>;
  message: ZodString;
}, $strip>;
```

Defined in: [schemas/core.schema.ts:227](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/core.schema.ts#L227)

Error shape for Astro content operations.

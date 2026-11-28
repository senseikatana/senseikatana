[katanakit-js](../index.md) / AstroServiceErrorSchema

# Variable: AstroServiceErrorSchema

```ts
const AstroServiceErrorSchema: ZodObject<{
  collectionName: ZodOptional<ZodString>;
  details: ZodOptional<ZodUnknown>;
  message: ZodString;
}, $strip>;
```

Defined in: [schemas/core.schema.ts:227](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/core.schema.ts#L227)

Error shape for Astro content operations.

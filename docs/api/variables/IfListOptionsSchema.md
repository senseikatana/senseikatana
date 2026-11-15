[katanakit-js](../index.md) / IfListOptionsSchema

# Variable: IfListOptionsSchema

```ts
const IfListOptionsSchema: ZodObject<{
  limit: ZodOptional<ZodNumber>;
  offset: ZodOptional<ZodNumber>;
  prefix: ZodOptional<ZodString>;
  search: ZodOptional<ZodString>;
}, $strip>;
```

Defined in: [schemas/insforge.schema.ts:82](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/insforge.schema.ts#L82)

Options for listing bucket objects.

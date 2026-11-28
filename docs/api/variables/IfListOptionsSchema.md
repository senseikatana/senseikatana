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

Defined in: [schemas/insforge.schema.ts:82](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/insforge.schema.ts#L82)

Options for listing bucket objects.

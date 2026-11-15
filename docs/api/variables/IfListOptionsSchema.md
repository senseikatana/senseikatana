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

Defined in: [schemas/insforge.schema.ts:82](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/insforge.schema.ts#L82)

Options for listing bucket objects.

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

Defined in: [schemas/insforge.schema.ts:82](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/insforge.schema.ts#L82)

Options for listing bucket objects.

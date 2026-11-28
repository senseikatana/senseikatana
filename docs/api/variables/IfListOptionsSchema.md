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

Defined in: [schemas/insforge.schema.ts:82](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/insforge.schema.ts#L82)

Options for listing bucket objects.

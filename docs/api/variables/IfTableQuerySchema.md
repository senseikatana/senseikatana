[katanakit-js](../index.md) / IfTableQuerySchema

# Variable: IfTableQuerySchema

```ts
const IfTableQuerySchema: ZodObject<{
  columns: ZodOptional<ZodString>;
  filters: ZodOptional<ZodRecord<ZodString, ZodUnion<readonly [ZodString, ZodNumber, ZodBoolean]>>>;
  limit: ZodOptional<ZodNumber>;
  offset: ZodOptional<ZodNumber>;
  order: ZodOptional<ZodObject<{
     ascending: ZodOptional<ZodBoolean>;
     column: ZodString;
  }, $strip>>;
  schema: ZodOptional<ZodString>;
  table: ZodString;
}, $strip>;
```

Defined in: [schemas/insforge.schema.ts:34](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/insforge.schema.ts#L34)

Options for a table read. Filters map to equality clauses.

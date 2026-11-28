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

Defined in: [schemas/insforge.schema.ts:34](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/insforge.schema.ts#L34)

Options for a table read. Filters map to equality clauses.

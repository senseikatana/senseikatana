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

Defined in: [schemas/insforge.schema.ts:34](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/insforge.schema.ts#L34)

Options for a table read. Filters map to equality clauses.

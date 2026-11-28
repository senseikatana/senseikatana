[katanakit-js](../index.md) / IfWriteQuerySchema

# Variable: IfWriteQuerySchema

```ts
const IfWriteQuerySchema: ZodObject<{
  filters: ZodRecord<ZodString, ZodUnion<readonly [ZodString, ZodNumber, ZodBoolean]>>;
  schema: ZodOptional<ZodString>;
  table: ZodString;
}, $strip>;
```

Defined in: [schemas/insforge.schema.ts:58](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/insforge.schema.ts#L58)

Options for an update or delete. Filters are REQUIRED (no mass writes).

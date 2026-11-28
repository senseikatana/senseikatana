[katanakit-js](../index.md) / DirectoryQuerySchema

# Variable: DirectoryQuerySchema

```ts
const DirectoryQuerySchema: ZodObject<{
  cursor: ZodOptional<ZodString>;
  limit: ZodDefault<ZodNumber>;
  role: ZodOptional<ZodString>;
  scope: ZodOptional<ZodString>;
  search: ZodOptional<ZodString>;
  status: ZodOptional<ZodEnum<{
     active: "active";
     deactivated: "deactivated";
     pending: "pending";
     suspended: "suspended";
  }>>;
}, $strip>;
```

Defined in: [schemas/directory.schema.ts:51](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/directory.schema.ts#L51)

A page request. `cursor` is opaque and provider-defined — the kit neither issues nor interprets it.

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

Defined in: [schemas/directory.schema.ts:54](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/directory.schema.ts#L54)

A page request. `cursor` is opaque and provider-defined — the kit neither
issues nor interprets it.

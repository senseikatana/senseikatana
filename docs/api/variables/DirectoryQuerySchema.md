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

Defined in: [schemas/directory.schema.ts:54](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/directory.schema.ts#L54)

A page request. `cursor` is opaque and provider-defined — the kit neither
issues nor interprets it.

[katanakit-js](../index.md) / DirectoryPageSchema

# Variable: DirectoryPageSchema

```ts
const DirectoryPageSchema: ZodObject<{
  nextCursor: ZodOptional<ZodString>;
  total: ZodOptional<ZodNumber>;
  users: ZodArray<ZodObject<{
     displayName: ZodOptional<ZodString>;
     email: ZodOptional<ZodString>;
     id: ZodUnion<readonly [ZodString, ZodNumber]>;
     metadata: ZodOptional<ZodRecord<ZodString, ZodUnknown>>;
     principalSubject: ZodOptional<ZodString>;
     roles: ZodDefault<ZodArray<ZodString>>;
     scope: ZodOptional<ZodString>;
     status: ZodDefault<ZodEnum<{
        active: "active";
        deactivated: "deactivated";
        pending: "pending";
        suspended: "suspended";
     }>>;
  }, $strip>>;
}, $strip>;
```

Defined in: [schemas/directory.schema.ts:64](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/directory.schema.ts#L64)

A page of results plus the cursor for the next one.

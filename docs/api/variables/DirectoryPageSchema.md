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

Defined in: [schemas/directory.schema.ts:61](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/directory.schema.ts#L61)

A page of results plus the cursor for the next one.

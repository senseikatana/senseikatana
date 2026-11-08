[katanakit-js](../index.md) / DirectoryUserSchema

# Variable: DirectoryUserSchema

```ts
const DirectoryUserSchema: ZodObject<{
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
}, $strip>;
```

Defined in: [schemas/directory.schema.ts:18](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/directory.schema.ts#L18)

A person as your directory stores them.

Distinct from the `Identity` in `identity.schema.ts`, which describes who a
provider says someone is. This is the record *you* own: it carries the
department, the employee number, the hire date — the facts that stay true
when the person switches sign-in method.

`principalSubject` is optional on purpose. A row with no provider account is
how a contractor, a temp, or a member who has not signed in yet exists in
the system without being a row in someone else's auth table.

[katanakit-js](../index.md) / AccessSubjectSchema

# Variable: AccessSubjectSchema

```ts
const AccessSubjectSchema: ZodObject<{
  id: ZodUnion<readonly [ZodString, ZodNumber]>;
  roles: ZodArray<ZodString>;
}, $loose>;
```

Defined in: [schemas/access.schema.ts:104](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/access.schema.ts#L104)

Structural subject for access checks. Decoupled from the persistence layer:
any object with an id and a role list can be checked (e.g. a Prisma
`Account` row, a JWT payload, or a test fixture).

Loose on purpose. A real deployment carries extra context alongside the
roles — the authenticated principal, a department, a tenant — and the core
has no business rejecting keys it does not interpret. Whatever a capability
means beyond "has the role" is enforced by the caller, against the resource.

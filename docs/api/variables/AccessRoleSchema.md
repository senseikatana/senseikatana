[katanakit-js](../index.md) / AccessRoleSchema

# Variable: AccessRoleSchema

```ts
const AccessRoleSchema: ZodString;
```

Defined in: [schemas/access.schema.ts:34](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/access.schema.ts#L34)

A role slug: lowercase, and made of alphanumeric words joined by `_`, `.`
or `-`. The format is enforced so a typo fails loudly at the schema
boundary instead of silently granting nothing.

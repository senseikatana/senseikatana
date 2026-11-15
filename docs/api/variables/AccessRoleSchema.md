[katanakit-js](../index.md) / AccessRoleSchema

# Variable: AccessRoleSchema

```ts
const AccessRoleSchema: ZodString;
```

Defined in: [schemas/access.schema.ts:34](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/access.schema.ts#L34)

A role slug: lowercase, and made of alphanumeric words joined by `_`, `.`
or `-`. The format is enforced so a typo fails loudly at the schema
boundary instead of silently granting nothing.

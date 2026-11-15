[katanakit-js](../index.md) / WpRoleDefinitionSchema

# Variable: WpRoleDefinitionSchema

```ts
const WpRoleDefinitionSchema: ZodObject<{
  capabilities: ZodArray<ZodString>;
  label: ZodString;
  rank: ZodNumber;
  slug: ZodString;
  wpCapabilities: ZodDefault<ZodArray<ZodString>>;
}, $strip>;
```

Defined in: [schemas/wordpress.schema.ts:663](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/wordpress.schema.ts#L663)

A role declaration, the PHP-free replacement for `add_role()`.

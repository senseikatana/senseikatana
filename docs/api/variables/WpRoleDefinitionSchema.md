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

Defined in: [schemas/wordpress.schema.ts:663](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/wordpress.schema.ts#L663)

A role declaration, the PHP-free replacement for `add_role()`.

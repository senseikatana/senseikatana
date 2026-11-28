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

Defined in: [schemas/wordpress.schema.ts:658](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/wordpress.schema.ts#L658)

A role declaration, the PHP-free replacement for `add_role()`.

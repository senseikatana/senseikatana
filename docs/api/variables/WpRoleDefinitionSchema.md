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

Defined in: [schemas/wordpress.schema.ts:663](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/wordpress.schema.ts#L663)

A role declaration, the PHP-free replacement for `add_role()`.

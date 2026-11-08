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

Defined in: [schemas/wordpress.schema.ts:663](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/wordpress.schema.ts#L663)

A role declaration, the PHP-free replacement for `add_role()`.

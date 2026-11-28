[katanakit-js](../index.md) / WpRoleRegistrySchema

# Variable: WpRoleRegistrySchema

```ts
const WpRoleRegistrySchema: ZodArray<ZodObject<{
  capabilities: ZodArray<ZodString>;
  label: ZodString;
  rank: ZodNumber;
  slug: ZodString;
  wpCapabilities: ZodDefault<ZodArray<ZodString>>;
}, $strip>>;
```

Defined in: [schemas/wordpress.schema.ts:667](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/wordpress.schema.ts#L667)

A declared role registry.

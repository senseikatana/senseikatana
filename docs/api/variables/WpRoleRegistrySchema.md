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

Defined in: [schemas/wordpress.schema.ts:672](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/wordpress.schema.ts#L672)

A declared role registry.

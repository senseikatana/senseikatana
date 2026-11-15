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

Defined in: [schemas/wordpress.schema.ts:672](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/wordpress.schema.ts#L672)

A declared role registry.

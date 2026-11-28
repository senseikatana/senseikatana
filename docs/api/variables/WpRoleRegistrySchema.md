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

Defined in: [schemas/wordpress.schema.ts:672](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/wordpress.schema.ts#L672)

A declared role registry.

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

Defined in: [schemas/wordpress.schema.ts:672](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/wordpress.schema.ts#L672)

A declared role registry.

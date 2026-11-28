[katanakit-js](../index.md) / KeyStatusSchema

# Variable: KeyStatusSchema

```ts
const KeyStatusSchema: ZodEnum<{
  active: "active";
  revoked: "revoked";
}>;
```

Defined in: [schemas/keyvault.schema.ts:14](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/keyvault.schema.ts#L14)

Lifecycle status of a stored API key. Revoked keys are kept for audit.

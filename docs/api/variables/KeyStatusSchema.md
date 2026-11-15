[katanakit-js](../index.md) / KeyStatusSchema

# Variable: KeyStatusSchema

```ts
const KeyStatusSchema: ZodEnum<{
  active: "active";
  revoked: "revoked";
}>;
```

Defined in: [schemas/keyvault.schema.ts:14](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/keyvault.schema.ts#L14)

Lifecycle status of a stored API key. Revoked keys are kept for audit.

[katanakit-js](../index.md) / KeyStatusSchema

# Variable: KeyStatusSchema

```ts
const KeyStatusSchema: ZodEnum<{
  active: "active";
  revoked: "revoked";
}>;
```

Defined in: [schemas/keyvault.schema.ts:14](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/keyvault.schema.ts#L14)

Lifecycle status of a stored API key. Revoked keys are kept for audit.

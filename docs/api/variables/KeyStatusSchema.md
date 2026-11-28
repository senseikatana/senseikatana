[katanakit-js](../index.md) / KeyStatusSchema

# Variable: KeyStatusSchema

```ts
const KeyStatusSchema: ZodEnum<{
  active: "active";
  revoked: "revoked";
}>;
```

Defined in: [schemas/keyvault.schema.ts:14](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/keyvault.schema.ts#L14)

Lifecycle status of a stored API key. Revoked keys are kept for audit.

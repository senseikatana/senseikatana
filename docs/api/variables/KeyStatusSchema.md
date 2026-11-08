[katanakit-js](../index.md) / KeyStatusSchema

# Variable: KeyStatusSchema

```ts
const KeyStatusSchema: ZodEnum<{
  active: "active";
  revoked: "revoked";
}>;
```

Defined in: [schemas/keyvault.schema.ts:14](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/keyvault.schema.ts#L14)

Lifecycle status of a stored API key. Revoked keys are kept for audit.

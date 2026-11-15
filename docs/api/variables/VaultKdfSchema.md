[katanakit-js](../index.md) / VaultKdfSchema

# Variable: VaultKdfSchema

```ts
const VaultKdfSchema: ZodObject<{
  keylen: ZodNumber;
  N: ZodNumber;
  name: ZodLiteral<"scrypt">;
  p: ZodNumber;
  r: ZodNumber;
  salt: ZodString;
}, $strip>;
```

Defined in: [schemas/keyvault.schema.ts:98](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/keyvault.schema.ts#L98)

Scrypt parameters stored alongside the ciphertext so they stay upgradeable.

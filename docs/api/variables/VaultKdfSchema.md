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

Defined in: [schemas/keyvault.schema.ts:98](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/keyvault.schema.ts#L98)

Scrypt parameters stored alongside the ciphertext so they stay upgradeable.

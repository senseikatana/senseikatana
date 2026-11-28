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

Defined in: [schemas/keyvault.schema.ts:98](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/keyvault.schema.ts#L98)

Scrypt parameters stored alongside the ciphertext so they stay upgradeable.

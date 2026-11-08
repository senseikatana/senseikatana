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

Defined in: [schemas/keyvault.schema.ts:98](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/keyvault.schema.ts#L98)

Scrypt parameters stored alongside the ciphertext so they stay upgradeable.

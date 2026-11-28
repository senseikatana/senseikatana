[katanakit-js](../index.md) / EncryptedVaultSchema

# Variable: EncryptedVaultSchema

```ts
const EncryptedVaultSchema: ZodObject<{
  cipher: ZodObject<{
     data: ZodString;
     iv: ZodString;
     name: ZodLiteral<"aes-256-gcm">;
     tag: ZodString;
  }, $strip>;
  kdf: ZodObject<{
     keylen: ZodNumber;
     N: ZodNumber;
     name: ZodLiteral<"scrypt">;
     p: ZodNumber;
     r: ZodNumber;
     salt: ZodString;
  }, $strip>;
  version: ZodLiteral<1>;
}, $strip>;
```

Defined in: [schemas/keyvault.schema.ts:116](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/keyvault.schema.ts#L116)

Encrypted vault file as it exists on disk. Versioned so a future format can migrate instead of guessing.

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

Defined in: [schemas/keyvault.schema.ts:119](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/keyvault.schema.ts#L119)

Encrypted vault file as it exists on disk. Versioned so a future format can
migrate instead of guessing.

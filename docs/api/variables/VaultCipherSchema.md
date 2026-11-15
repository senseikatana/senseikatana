[katanakit-js](../index.md) / VaultCipherSchema

# Variable: VaultCipherSchema

```ts
const VaultCipherSchema: ZodObject<{
  data: ZodString;
  iv: ZodString;
  name: ZodLiteral<"aes-256-gcm">;
  tag: ZodString;
}, $strip>;
```

Defined in: [schemas/keyvault.schema.ts:108](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/keyvault.schema.ts#L108)

AES-256-GCM envelope: IV and auth tag travel with the ciphertext.

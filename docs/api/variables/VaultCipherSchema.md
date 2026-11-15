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

Defined in: [schemas/keyvault.schema.ts:108](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/keyvault.schema.ts#L108)

AES-256-GCM envelope: IV and auth tag travel with the ciphertext.

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

Defined in: [schemas/keyvault.schema.ts:108](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/keyvault.schema.ts#L108)

AES-256-GCM envelope: IV and auth tag travel with the ciphertext.

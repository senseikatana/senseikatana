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

Defined in: [schemas/keyvault.schema.ts:108](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/keyvault.schema.ts#L108)

AES-256-GCM envelope: IV and auth tag travel with the ciphertext.

[katanakit-js](../index.md) / KeyRecordSchema

# Variable: KeyRecordSchema

```ts
const KeyRecordSchema: ZodObject<{
  createdAt: ZodString;
  id: ZodString;
  label: ZodString;
  note: ZodOptional<ZodString>;
  provider: ZodString;
  secret: ZodString;
  status: ZodEnum<{
     active: "active";
     revoked: "revoked";
  }>;
  updatedAt: ZodString;
}, $strip>;
```

Defined in: [schemas/keyvault.schema.ts:38](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/keyvault.schema.ts#L38)

One API key as stored in the vault. `secret` only ever lives inside the
encrypted payload — presentation layers receive it masked unless the caller
explicitly asks to reveal it.

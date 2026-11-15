[katanakit-js](../index.md) / VaultDataSchema

# Variable: VaultDataSchema

```ts
const VaultDataSchema: ZodObject<{
  createdAt: ZodString;
  keys: ZodArray<ZodObject<{
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
  }, $strip>>;
  mcpServers: ZodArray<ZodObject<{
     command: ZodOptional<ZodArray<ZodString>>;
     disabled: ZodOptional<ZodBoolean>;
     environment: ZodOptional<ZodRecord<ZodString, ZodString>>;
     headers: ZodOptional<ZodRecord<ZodString, ZodString>>;
     name: ZodString;
     type: ZodEnum<{
        local: "local";
        remote: "remote";
     }>;
     url: ZodOptional<ZodString>;
  }, $strip>>;
  updatedAt: ZodString;
  version: ZodLiteral<1>;
}, $strip>;
```

Defined in: [schemas/keyvault.schema.ts:89](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/keyvault.schema.ts#L89)

Decrypted vault payload — the complete state of the key manager.

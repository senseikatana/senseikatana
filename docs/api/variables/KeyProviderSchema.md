[katanakit-js](../index.md) / KeyProviderSchema

# Variable: KeyProviderSchema

```ts
const KeyProviderSchema: ZodString;
```

Defined in: [schemas/keyvault.schema.ts:24](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/keyvault.schema.ts#L24)

Provider slug: lowercase alphanumerics joined by `_`, `.` or `-`. The same
shape `AccessRoleSchema` enforces, so a provider id can never surprise a
downstream consumer with spaces or slashes.

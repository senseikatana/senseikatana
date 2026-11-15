[katanakit-js](../index.md) / KeyProviderSchema

# Variable: KeyProviderSchema

```ts
const KeyProviderSchema: ZodString;
```

Defined in: [schemas/keyvault.schema.ts:24](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/keyvault.schema.ts#L24)

Provider slug: lowercase alphanumerics joined by `_`, `.` or `-`. The same
shape `AccessRoleSchema` enforces, so a provider id can never surprise a
downstream consumer with spaces or slashes.

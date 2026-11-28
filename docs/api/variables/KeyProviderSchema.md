[katanakit-js](../index.md) / KeyProviderSchema

# Variable: KeyProviderSchema

```ts
const KeyProviderSchema: ZodString;
```

Defined in: [schemas/keyvault.schema.ts:24](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/keyvault.schema.ts#L24)

Provider slug: lowercase alphanumerics joined by `_`, `.` or `-`. The same
shape `AccessRoleSchema` enforces, so a provider id can never surprise a
downstream consumer with spaces or slashes.

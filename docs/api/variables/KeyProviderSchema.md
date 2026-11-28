[katanakit-js](../index.md) / KeyProviderSchema

# Variable: KeyProviderSchema

```ts
const KeyProviderSchema: ZodString;
```

Defined in: [schemas/keyvault.schema.ts:24](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/keyvault.schema.ts#L24)

Provider slug: lowercase alphanumerics joined by `_`, `.` or `-`. The same
shape `AccessRoleSchema` enforces, so a provider id can never surprise a
downstream consumer with spaces or slashes.

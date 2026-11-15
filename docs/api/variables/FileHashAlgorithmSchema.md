[katanakit-js](../index.md) / FileHashAlgorithmSchema

# Variable: FileHashAlgorithmSchema

```ts
const FileHashAlgorithmSchema: ZodEnum<{
  md5: "md5";
  sha1: "sha1";
  sha256: "sha256";
  sha512: "sha512";
}>;
```

Defined in: [schemas/filesystem.schema.ts:20](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/filesystem.schema.ts#L20)

Hash algorithms supported by `useHashFile` / `useVerifyFileHash`.

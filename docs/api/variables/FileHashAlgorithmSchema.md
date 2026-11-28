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

Defined in: [schemas/filesystem.schema.ts:20](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/filesystem.schema.ts#L20)

Hash algorithms supported by `onHashFile` / `onVerifyFileHash`.

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

Defined in: [schemas/filesystem.schema.ts:20](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/filesystem.schema.ts#L20)

Hash algorithms supported by `useHashFile` / `useVerifyFileHash`.

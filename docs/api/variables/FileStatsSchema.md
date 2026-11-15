[katanakit-js](../index.md) / FileStatsSchema

# Variable: FileStatsSchema

```ts
const FileStatsSchema: ZodObject<{
  accessedAt: ZodNumber;
  createdAt: ZodNumber;
  isDirectory: ZodBoolean;
  isFile: ZodBoolean;
  isSymbolicLink: ZodBoolean;
  modifiedAt: ZodNumber;
  size: ZodNumber;
}, $strip>;
```

Defined in: [schemas/filesystem.schema.ts:31](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/filesystem.schema.ts#L31)

Portable stats subset for a file or directory.

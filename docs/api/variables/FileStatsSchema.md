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

Defined in: [schemas/filesystem.schema.ts:31](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/filesystem.schema.ts#L31)

Portable stats subset for a file or directory.

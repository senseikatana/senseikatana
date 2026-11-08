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

Defined in: [schemas/filesystem.schema.ts:31](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/filesystem.schema.ts#L31)

Portable stats subset for a file or directory.

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

Defined in: [schemas/filesystem.schema.ts:31](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/filesystem.schema.ts#L31)

Portable stats subset for a file or directory.

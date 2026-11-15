[katanakit-js](../index.md) / ReadDirEntrySchema

# Variable: ReadDirEntrySchema

```ts
const ReadDirEntrySchema: ZodObject<{
  isDirectory: ZodBoolean;
  isFile: ZodBoolean;
  name: ZodString;
  path: ZodString;
}, $strip>;
```

Defined in: [schemas/filesystem.schema.ts:45](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/filesystem.schema.ts#L45)

A single directory entry with pre-resolved type flags.

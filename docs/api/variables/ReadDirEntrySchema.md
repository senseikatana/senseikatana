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

Defined in: [schemas/filesystem.schema.ts:45](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/filesystem.schema.ts#L45)

A single directory entry with pre-resolved type flags.

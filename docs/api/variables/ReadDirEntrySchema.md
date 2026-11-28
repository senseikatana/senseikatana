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

Defined in: [schemas/filesystem.schema.ts:45](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/filesystem.schema.ts#L45)

A single directory entry with pre-resolved type flags.

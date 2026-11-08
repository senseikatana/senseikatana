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

Defined in: [schemas/filesystem.schema.ts:45](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/filesystem.schema.ts#L45)

A single directory entry with pre-resolved type flags.

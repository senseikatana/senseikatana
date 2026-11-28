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

Defined in: [schemas/filesystem.schema.ts:45](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/filesystem.schema.ts#L45)

A single directory entry with pre-resolved type flags.

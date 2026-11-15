[katanakit-js](../index.md) / FilesystemErrorSchema

# Variable: FilesystemErrorSchema

```ts
const FilesystemErrorSchema: ZodObject<{
  code: ZodString;
  details: ZodOptional<ZodUnknown>;
  message: ZodString;
  path: ZodOptional<ZodString>;
}, $strip>;
```

Defined in: [schemas/filesystem.schema.ts:23](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/filesystem.schema.ts#L23)

Safe error from a filesystem operation (`NodeJS.ErrnoException`-shaped).

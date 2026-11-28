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

Defined in: [schemas/filesystem.schema.ts:23](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/filesystem.schema.ts#L23)

Safe error from a filesystem operation (`NodeJS.ErrnoException`-shaped).

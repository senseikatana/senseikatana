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

Defined in: [schemas/filesystem.schema.ts:23](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/filesystem.schema.ts#L23)

Safe error from a filesystem operation (`NodeJS.ErrnoException`-shaped).

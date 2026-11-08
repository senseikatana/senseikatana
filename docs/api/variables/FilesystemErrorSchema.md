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

Defined in: [schemas/filesystem.schema.ts:23](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/filesystem.schema.ts#L23)

Safe error from a filesystem operation (`NodeJS.ErrnoException`-shaped).

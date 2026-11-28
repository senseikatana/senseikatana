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

Defined in: [schemas/filesystem.schema.ts:23](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/filesystem.schema.ts#L23)

Safe error from a filesystem operation (`NodeJS.ErrnoException`-shaped).

[katanakit-js](../index.md) / MediaSourceSchema

# Variable: MediaSourceSchema

```ts
const MediaSourceSchema: ZodObject<{
  id: ZodString;
  provider: ZodEnum<{
     file: "file";
     unknown: "unknown";
     vimeo: "vimeo";
     youtube: "youtube";
  }>;
  raw: ZodString;
}, $strip>;
```

Defined in: [schemas/media.schema.ts:7](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/media.schema.ts#L7)

Normalized media source: provider + stable id or direct src.

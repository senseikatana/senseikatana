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

Defined in: [schemas/media.schema.ts:7](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/media.schema.ts#L7)

Normalized media source: provider + stable id or direct src.

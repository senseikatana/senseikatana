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

Defined in: [schemas/media.schema.ts:7](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/media.schema.ts#L7)

Normalized media source: provider + stable id or direct src.

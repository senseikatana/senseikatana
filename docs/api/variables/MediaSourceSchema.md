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

Defined in: [schemas/media.schema.ts:7](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/media.schema.ts#L7)

Normalized media source: provider + stable id or direct src.

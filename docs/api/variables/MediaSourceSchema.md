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

Defined in: [schemas/media.schema.ts:7](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/media.schema.ts#L7)

Normalized media source: provider + stable id or direct src.

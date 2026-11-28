[katanakit-js](../index.md) / MediaProviderSchema

# Variable: MediaProviderSchema

```ts
const MediaProviderSchema: ZodEnum<{
  file: "file";
  unknown: "unknown";
  vimeo: "vimeo";
  youtube: "youtube";
}>;
```

Defined in: [schemas/media.schema.ts:4](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/media.schema.ts#L4)

Where a media source comes from. `file` = direct mp4/webm (native `<video>`).

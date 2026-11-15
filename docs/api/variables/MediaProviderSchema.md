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

Defined in: [schemas/media.schema.ts:4](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/media.schema.ts#L4)

Where a media source comes from. `file` = direct mp4/webm (native `<video>`).

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

Defined in: [schemas/media.schema.ts:4](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/media.schema.ts#L4)

Where a media source comes from. `file` = direct mp4/webm (native `<video>`).

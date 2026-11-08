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

Defined in: [schemas/media.schema.ts:4](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/media.schema.ts#L4)

Where a media source comes from. `file` = direct mp4/webm (native `<video>`).

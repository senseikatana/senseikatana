[katanakit-js](../index.md) / YoutubeEmbedOptionsSchema

# Variable: YoutubeEmbedOptionsSchema

```ts
const YoutubeEmbedOptionsSchema: ZodObject<{
  autoplay: ZodOptional<ZodBoolean>;
  end: ZodOptional<ZodNumber>;
  params: ZodOptional<ZodRecord<ZodString, ZodUnion<readonly [ZodString, ZodNumber, ZodBoolean]>>>;
  start: ZodOptional<ZodNumber>;
}, $strip>;
```

Defined in: [schemas/media.schema.ts:16](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/media.schema.ts#L16)

Options for the YouTube nocookie embed URL.

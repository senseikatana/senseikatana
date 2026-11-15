[katanakit-js](../index.md) / SmartVideoOptionsSchema

# Variable: SmartVideoOptionsSchema

```ts
const SmartVideoOptionsSchema: ZodObject<{
  aspect: ZodOptional<ZodString>;
  caption: ZodOptional<ZodString>;
  className: ZodOptional<ZodString>;
  facade: ZodOptional<ZodBoolean>;
  poster: ZodOptional<ZodString>;
  src: ZodString;
  title: ZodString;
  youtube: ZodOptional<ZodObject<{
     autoplay: ZodOptional<ZodBoolean>;
     end: ZodOptional<ZodNumber>;
     params: ZodOptional<ZodRecord<ZodString, ZodUnion<readonly [ZodString, ZodNumber, ZodBoolean]>>>;
     start: ZodOptional<ZodNumber>;
  }, $strip>>;
}, $strip>;
```

Defined in: [schemas/media.schema.ts:37](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/media.schema.ts#L37)

Input for `useBuildVideoEmbed` (core) — one `src`, unified output.

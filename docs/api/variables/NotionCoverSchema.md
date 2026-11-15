[katanakit-js](../index.md) / NotionCoverSchema

# Variable: NotionCoverSchema

```ts
const NotionCoverSchema: ZodUnion<readonly [ZodObject<{
  external: ZodObject<{
     url: ZodString;
  }, $loose>;
  type: ZodLiteral<"external">;
}, $loose>, ZodObject<{
  file: ZodObject<{
     url: ZodString;
  }, $loose>;
  type: ZodLiteral<"file">;
}, $loose>]>;
```

Defined in: [schemas/notion.schema.ts:112](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/notion.schema.ts#L112)

Cover image on a page.

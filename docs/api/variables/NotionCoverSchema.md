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

Defined in: [schemas/notion.schema.ts:112](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/notion.schema.ts#L112)

Cover image on a page.

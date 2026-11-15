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

Defined in: [schemas/notion.schema.ts:112](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/notion.schema.ts#L112)

Cover image on a page.

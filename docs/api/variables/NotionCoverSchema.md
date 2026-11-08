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

Defined in: [schemas/notion.schema.ts:112](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/notion.schema.ts#L112)

Cover image on a page.

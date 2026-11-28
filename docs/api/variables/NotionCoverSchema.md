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

Defined in: [schemas/notion.schema.ts:112](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/notion.schema.ts#L112)

Cover image on a page.

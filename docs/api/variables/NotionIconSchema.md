[katanakit-js](../index.md) / NotionIconSchema

# Variable: NotionIconSchema

```ts
const NotionIconSchema: ZodUnion<readonly [ZodObject<{
  emoji: ZodString;
  type: ZodLiteral<"emoji">;
}, $loose>, ZodObject<{
  file: ZodObject<{
     url: ZodString;
  }, $loose>;
  type: ZodLiteral<"file">;
}, $loose>]>;
```

Defined in: [schemas/notion.schema.ts:106](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/notion.schema.ts#L106)

Icon on a page or database (emoji or file).

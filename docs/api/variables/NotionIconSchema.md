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

Defined in: [schemas/notion.schema.ts:106](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/notion.schema.ts#L106)

Icon on a page or database (emoji or file).

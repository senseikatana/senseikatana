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

Defined in: [schemas/notion.schema.ts:106](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/notion.schema.ts#L106)

Icon on a page or database (emoji or file).

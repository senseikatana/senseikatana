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

Defined in: [schemas/notion.schema.ts:106](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/notion.schema.ts#L106)

Icon on a page or database (emoji or file).

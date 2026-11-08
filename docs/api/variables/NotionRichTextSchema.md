[katanakit-js](../index.md) / NotionRichTextSchema

# Variable: NotionRichTextSchema

```ts
const NotionRichTextSchema: ZodObject<{
  annotations: ZodOptional<ZodObject<{
     bold: ZodOptional<ZodBoolean>;
     code: ZodOptional<ZodBoolean>;
     color: ZodOptional<ZodString>;
     italic: ZodOptional<ZodBoolean>;
     strikethrough: ZodOptional<ZodBoolean>;
     underline: ZodOptional<ZodBoolean>;
  }, $loose>>;
  href: ZodOptional<ZodNullable<ZodString>>;
  plain_text: ZodOptional<ZodString>;
  text: ZodObject<{
     content: ZodString;
     link: ZodOptional<ZodNullable<ZodObject<{
        url: ZodString;
     }, $loose>>>;
  }, $loose>;
  type: ZodLiteral<"text">;
}, $loose>;
```

Defined in: [schemas/notion.schema.ts:16](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/notion.schema.ts#L16)

Rich text object used in Notion blocks and properties.

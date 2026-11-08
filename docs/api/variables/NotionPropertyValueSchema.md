[katanakit-js](../index.md) / NotionPropertyValueSchema

# Variable: NotionPropertyValueSchema

```ts
const NotionPropertyValueSchema: ZodObject<{
  checkbox: ZodOptional<ZodBoolean>;
  date: ZodOptional<ZodNullable<ZodObject<{
     end: ZodOptional<ZodNullable<ZodString>>;
     start: ZodString;
  }, $loose>>>;
  email: ZodOptional<ZodNullable<ZodString>>;
  formula: ZodOptional<ZodObject<{
     boolean: ZodOptional<ZodBoolean>;
     number: ZodOptional<ZodNumber>;
     string: ZodOptional<ZodString>;
     type: ZodString;
  }, $loose>>;
  id: ZodOptional<ZodString>;
  multi_select: ZodOptional<ZodArray<ZodObject<{
     color: ZodOptional<ZodString>;
     id: ZodString;
     name: ZodString;
  }, $loose>>>;
  number: ZodOptional<ZodNumber>;
  phone_number: ZodOptional<ZodNullable<ZodString>>;
  relation: ZodOptional<ZodArray<ZodObject<{
     id: ZodString;
  }, $loose>>>;
  rich_text: ZodOptional<ZodArray<ZodObject<{
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
        link: ZodOptional<ZodNullable<ZodObject<..., ...>>>;
     }, $loose>;
     type: ZodLiteral<"text">;
  }, $loose>>>;
  rollup: ZodOptional<ZodObject<{
     number: ZodOptional<ZodNumber>;
     type: ZodString;
  }, $loose>>;
  select: ZodOptional<ZodNullable<ZodObject<{
     color: ZodOptional<ZodString>;
     id: ZodString;
     name: ZodString;
  }, $loose>>>;
  status: ZodOptional<ZodNullable<ZodObject<{
     color: ZodOptional<ZodString>;
     id: ZodString;
     name: ZodString;
  }, $loose>>>;
  title: ZodOptional<ZodArray<ZodObject<{
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
        link: ZodOptional<ZodNullable<ZodObject<..., ...>>>;
     }, $loose>;
     type: ZodLiteral<"text">;
  }, $loose>>>;
  type: ZodString;
  url: ZodOptional<ZodNullable<ZodString>>;
}, $catchall<ZodUnknown>>;
```

Defined in: [schemas/notion.schema.ts:44](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/notion.schema.ts#L44)

Property value on a Notion page.

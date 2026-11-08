[katanakit-js](../index.md) / NotionDatabaseSchema

# Variable: NotionDatabaseSchema

```ts
const NotionDatabaseSchema: ZodObject<{
  archived: ZodOptional<ZodBoolean>;
  cover: ZodOptional<ZodNullable<ZodUnion<readonly [ZodObject<{
     external: ZodObject<{
        url: ZodString;
     }, $loose>;
     type: ZodLiteral<"external">;
   }, $loose>, ZodObject<{
     file: ZodObject<{
        url: ZodString;
     }, $loose>;
     type: ZodLiteral<"file">;
  }, $loose>]>>>;
  created_time: ZodString;
  description: ZodArray<ZodObject<{
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
           url: ...;
        }, $loose>>>;
     }, $loose>;
     type: ZodLiteral<"text">;
  }, $loose>>;
  icon: ZodOptional<ZodNullable<ZodUnion<readonly [ZodObject<{
     emoji: ZodString;
     type: ZodLiteral<"emoji">;
   }, $loose>, ZodObject<{
     file: ZodObject<{
        url: ZodString;
     }, $loose>;
     type: ZodLiteral<"file">;
  }, $loose>]>>>;
  id: ZodString;
  last_edited_time: ZodString;
  object: ZodLiteral<"database">;
  parent: ZodUnion<readonly [ZodObject<{
     database_id: ZodString;
     type: ZodLiteral<"database_id">;
   }, $loose>, ZodObject<{
     page_id: ZodString;
     type: ZodLiteral<"page_id">;
   }, $loose>, ZodObject<{
     type: ZodLiteral<"workspace">;
     workspace: ZodLiteral<true>;
  }, $loose>]>;
  properties: ZodRecord<ZodString, ZodObject<{
     id: ZodOptional<ZodString>;
     name: ZodOptional<ZodString>;
     type: ZodString;
  }, $catchall<ZodUnknown>>>;
  title: ZodArray<ZodObject<{
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
           url: ...;
        }, $loose>>>;
     }, $loose>;
     type: ZodLiteral<"text">;
  }, $loose>>;
  url: ZodString;
}, $loose>;
```

Defined in: [schemas/notion.schema.ts:166](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/notion.schema.ts#L166)

A Notion database object.

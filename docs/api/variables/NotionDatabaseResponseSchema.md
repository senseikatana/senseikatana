[katanakit-js](../index.md) / NotionDatabaseResponseSchema

# Variable: NotionDatabaseResponseSchema

```ts
const NotionDatabaseResponseSchema: ZodObject<{
  archived: ZodOptional<ZodOptional<ZodBoolean>>;
  cover: ZodOptional<ZodOptional<ZodNullable<ZodUnion<readonly [ZodObject<{
     external: ZodObject<{
        url: ...;
     }, $loose>;
     type: ZodLiteral<"external">;
   }, $loose>, ZodObject<{
     file: ZodObject<{
        url: ...;
     }, $loose>;
     type: ZodLiteral<"file">;
  }, $loose>]>>>>;
  created_time: ZodOptional<ZodString>;
  description: ZodOptional<ZodArray<ZodObject<{
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
  icon: ZodOptional<ZodOptional<ZodNullable<ZodUnion<readonly [ZodObject<{
     emoji: ZodString;
     type: ZodLiteral<"emoji">;
   }, $loose>, ZodObject<{
     file: ZodObject<{
        url: ...;
     }, $loose>;
     type: ZodLiteral<"file">;
  }, $loose>]>>>>;
  id: ZodOptional<ZodString>;
  last_edited_time: ZodOptional<ZodString>;
  object: ZodOptional<ZodLiteral<"database">>;
  parent: ZodOptional<ZodUnion<readonly [ZodObject<{
     database_id: ZodString;
     type: ZodLiteral<"database_id">;
   }, $loose>, ZodObject<{
     page_id: ZodString;
     type: ZodLiteral<"page_id">;
   }, $loose>, ZodObject<{
     type: ZodLiteral<"workspace">;
     workspace: ZodLiteral<true>;
  }, $loose>]>>;
  properties: ZodOptional<ZodRecord<ZodString, ZodObject<{
     id: ZodOptional<ZodString>;
     name: ZodOptional<ZodString>;
     type: ZodString;
  }, $catchall<ZodUnknown>>>>;
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
  url: ZodOptional<ZodString>;
}, $loose>;
```

Defined in: [schemas/notion.schema.ts:272](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/notion.schema.ts#L272)

Single database response (fields may be sparse depending on the endpoint).

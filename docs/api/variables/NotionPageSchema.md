[katanakit-js](../index.md) / NotionPageSchema

# Variable: NotionPageSchema

```ts
const NotionPageSchema: ZodObject<{
  archived: ZodBoolean;
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
  created_by: ZodObject<{
     id: ZodString;
     object: ZodLiteral<"user">;
  }, $loose>;
  created_time: ZodString;
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
  last_edited_by: ZodObject<{
     id: ZodString;
     object: ZodLiteral<"user">;
  }, $loose>;
  last_edited_time: ZodString;
  object: ZodLiteral<"page">;
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
     checkbox: ZodOptional<ZodBoolean>;
     date: ZodOptional<ZodNullable<ZodObject<{
        end: ZodOptional<ZodNullable<...>>;
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
        annotations: ZodOptional<ZodObject<..., ...>>;
        href: ZodOptional<ZodNullable<...>>;
        plain_text: ZodOptional<ZodString>;
        text: ZodObject<{
           content: ...;
           link: ...;
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
        annotations: ZodOptional<ZodObject<..., ...>>;
        href: ZodOptional<ZodNullable<...>>;
        plain_text: ZodOptional<ZodString>;
        text: ZodObject<{
           content: ...;
           link: ...;
        }, $loose>;
        type: ZodLiteral<"text">;
     }, $loose>>>;
     type: ZodString;
     url: ZodOptional<ZodNullable<ZodString>>;
  }, $catchall<ZodUnknown>>>;
  url: ZodString;
}, $loose>;
```

Defined in: [schemas/notion.schema.ts:118](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/notion.schema.ts#L118)

A Notion page object.

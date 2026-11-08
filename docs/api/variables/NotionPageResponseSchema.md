[katanakit-js](../index.md) / NotionPageResponseSchema

# Variable: NotionPageResponseSchema

```ts
const NotionPageResponseSchema: ZodObject<{
  archived: ZodOptional<ZodBoolean>;
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
  created_by: ZodOptional<ZodObject<{
     id: ZodString;
     object: ZodLiteral<"user">;
  }, $loose>>;
  created_time: ZodOptional<ZodString>;
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
  last_edited_by: ZodOptional<ZodObject<{
     id: ZodString;
     object: ZodLiteral<"user">;
  }, $loose>>;
  last_edited_time: ZodOptional<ZodString>;
  object: ZodOptional<ZodLiteral<"page">>;
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
     checkbox: ZodOptional<ZodBoolean>;
     date: ZodOptional<ZodNullable<ZodObject<{
        end: ZodOptional<...>;
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
        color: ZodOptional<...>;
        id: ZodString;
        name: ZodString;
     }, $loose>>>;
     number: ZodOptional<ZodNumber>;
     phone_number: ZodOptional<ZodNullable<ZodString>>;
     relation: ZodOptional<ZodArray<ZodObject<{
        id: ZodString;
     }, $loose>>>;
     rich_text: ZodOptional<ZodArray<ZodObject<{
        annotations: ZodOptional<...>;
        href: ZodOptional<...>;
        plain_text: ZodOptional<...>;
        text: ZodObject<..., ...>;
        type: ZodLiteral<...>;
     }, $loose>>>;
     rollup: ZodOptional<ZodObject<{
        number: ZodOptional<ZodNumber>;
        type: ZodString;
     }, $loose>>;
     select: ZodOptional<ZodNullable<ZodObject<{
        color: ZodOptional<...>;
        id: ZodString;
        name: ZodString;
     }, $loose>>>;
     status: ZodOptional<ZodNullable<ZodObject<{
        color: ZodOptional<...>;
        id: ZodString;
        name: ZodString;
     }, $loose>>>;
     title: ZodOptional<ZodArray<ZodObject<{
        annotations: ZodOptional<...>;
        href: ZodOptional<...>;
        plain_text: ZodOptional<...>;
        text: ZodObject<..., ...>;
        type: ZodLiteral<...>;
     }, $loose>>>;
     type: ZodString;
     url: ZodOptional<ZodNullable<ZodString>>;
  }, $catchall<ZodUnknown>>>>;
  url: ZodOptional<ZodString>;
}, $loose>;
```

Defined in: [schemas/notion.schema.ts:266](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/notion.schema.ts#L266)

Single page response (fields may be sparse depending on the endpoint).

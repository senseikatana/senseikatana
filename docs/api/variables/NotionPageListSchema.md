[katanakit-js](../index.md) / NotionPageListSchema

# Variable: NotionPageListSchema

```ts
const NotionPageListSchema: ZodObject<{
  has_more: ZodBoolean;
  next_cursor: ZodNullable<ZodString>;
  object: ZodLiteral<"list">;
  page: ZodRecord<ZodString, ZodUnknown>;
  results: ZodArray<ZodObject<{
     archived: ZodBoolean;
     cover: ZodOptional<ZodNullable<ZodUnion<readonly [ZodObject<{
        external: ...;
        type: ...;
      }, $loose>, ZodObject<{
        file: ...;
        type: ...;
     }, $loose>]>>>;
     created_by: ZodObject<{
        id: ZodString;
        object: ZodLiteral<"user">;
     }, $loose>;
     created_time: ZodString;
     icon: ZodOptional<ZodNullable<ZodUnion<readonly [ZodObject<{
        emoji: ...;
        type: ...;
      }, $loose>, ZodObject<{
        file: ...;
        type: ...;
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
        date: ZodOptional<ZodNullable<ZodObject<..., ...>>>;
        email: ZodOptional<ZodNullable<ZodString>>;
        formula: ZodOptional<ZodObject<{
           boolean: ...;
           number: ...;
           string: ...;
           type: ...;
        }, $loose>>;
        id: ZodOptional<ZodString>;
        multi_select: ZodOptional<ZodArray<ZodObject<..., ...>>>;
        number: ZodOptional<ZodNumber>;
        phone_number: ZodOptional<ZodNullable<ZodString>>;
        relation: ZodOptional<ZodArray<ZodObject<..., ...>>>;
        rich_text: ZodOptional<ZodArray<ZodObject<..., ...>>>;
        rollup: ZodOptional<ZodObject<{
           number: ...;
           type: ...;
        }, $loose>>;
        select: ZodOptional<ZodNullable<ZodObject<..., ...>>>;
        status: ZodOptional<ZodNullable<ZodObject<..., ...>>>;
        title: ZodOptional<ZodArray<ZodObject<..., ...>>>;
        type: ZodString;
        url: ZodOptional<ZodNullable<ZodString>>;
     }, $catchall<ZodUnknown>>>;
     url: ZodString;
  }, $loose>>;
  type: ZodLiteral<"page">;
}, $loose>;
```

Defined in: [schemas/notion.schema.ts:206](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/notion.schema.ts#L206)

Result of querying a Notion database (paginated).

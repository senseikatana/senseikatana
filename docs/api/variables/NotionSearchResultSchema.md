[katanakit-js](../index.md) / NotionSearchResultSchema

# Variable: NotionSearchResultSchema

```ts
const NotionSearchResultSchema: ZodObject<{
  has_more: ZodBoolean;
  next_cursor: ZodNullable<ZodString>;
  object: ZodLiteral<"list">;
  results: ZodArray<ZodUnion<readonly [ZodObject<{
     archived: ZodBoolean;
     cover: ZodOptional<ZodNullable<ZodUnion<readonly [..., ...]>>>;
     created_by: ZodObject<{
        id: ZodString;
        object: ZodLiteral<"user">;
     }, $loose>;
     created_time: ZodString;
     icon: ZodOptional<ZodNullable<ZodUnion<readonly [..., ...]>>>;
     id: ZodString;
     last_edited_by: ZodObject<{
        id: ZodString;
        object: ZodLiteral<"user">;
     }, $loose>;
     last_edited_time: ZodString;
     object: ZodLiteral<"page">;
     parent: ZodUnion<readonly [ZodObject<{
        database_id: ...;
        type: ...;
      }, $loose>, ZodObject<{
        page_id: ...;
        type: ...;
      }, $loose>, ZodObject<{
        type: ...;
        workspace: ...;
     }, $loose>]>;
     properties: ZodRecord<ZodString, ZodObject<{
        checkbox: ZodOptional<...>;
        date: ZodOptional<...>;
        email: ZodOptional<...>;
        formula: ZodOptional<...>;
        id: ZodOptional<...>;
        multi_select: ZodOptional<...>;
        number: ZodOptional<...>;
        phone_number: ZodOptional<...>;
        relation: ZodOptional<...>;
        rich_text: ZodOptional<...>;
        rollup: ZodOptional<...>;
        select: ZodOptional<...>;
        status: ZodOptional<...>;
        title: ZodOptional<...>;
        type: ZodString;
        url: ZodOptional<...>;
     }, $catchall<ZodUnknown>>>;
     url: ZodString;
   }, $loose>, ZodObject<{
     archived: ZodOptional<ZodBoolean>;
     cover: ZodOptional<ZodNullable<ZodUnion<readonly [..., ...]>>>;
     created_time: ZodString;
     description: ZodArray<ZodObject<{
        annotations: ZodOptional<...>;
        href: ZodOptional<...>;
        plain_text: ZodOptional<...>;
        text: ZodObject<..., ...>;
        type: ZodLiteral<...>;
     }, $loose>>;
     icon: ZodOptional<ZodNullable<ZodUnion<readonly [..., ...]>>>;
     id: ZodString;
     last_edited_time: ZodString;
     object: ZodLiteral<"database">;
     parent: ZodUnion<readonly [ZodObject<{
        database_id: ...;
        type: ...;
      }, $loose>, ZodObject<{
        page_id: ...;
        type: ...;
      }, $loose>, ZodObject<{
        type: ...;
        workspace: ...;
     }, $loose>]>;
     properties: ZodRecord<ZodString, ZodObject<{
        id: ZodOptional<...>;
        name: ZodOptional<...>;
        type: ZodString;
     }, $catchall<ZodUnknown>>>;
     title: ZodArray<ZodObject<{
        annotations: ZodOptional<...>;
        href: ZodOptional<...>;
        plain_text: ZodOptional<...>;
        text: ZodObject<..., ...>;
        type: ZodLiteral<...>;
     }, $loose>>;
     url: ZodString;
  }, $loose>]>>;
}, $loose>;
```

Defined in: [schemas/notion.schema.ts:254](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/notion.schema.ts#L254)

Result of a Notion search (paginated).

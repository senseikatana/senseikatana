[katanakit-js](../index.md) / NotionParentSchema

# Variable: NotionParentSchema

```ts
const NotionParentSchema: ZodUnion<readonly [ZodObject<{
  database_id: ZodString;
  type: ZodLiteral<"database_id">;
}, $loose>, ZodObject<{
  page_id: ZodString;
  type: ZodLiteral<"page_id">;
}, $loose>, ZodObject<{
  type: ZodLiteral<"workspace">;
  workspace: ZodLiteral<true>;
}, $loose>]>;
```

Defined in: [schemas/notion.schema.ts:37](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/notion.schema.ts#L37)

Parent reference for pages and databases.

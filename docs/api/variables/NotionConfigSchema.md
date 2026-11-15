[katanakit-js](../index.md) / NotionConfigSchema

# Variable: NotionConfigSchema

```ts
const NotionConfigSchema: ZodObject<{
  apiBaseUrl: ZodOptional<ZodString>;
  apiVersion: ZodOptional<ZodString>;
  token: ZodString;
}, $strip>;
```

Defined in: [schemas/notion.schema.ts:6](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/notion.schema.ts#L6)

Config for the Notion API integration.

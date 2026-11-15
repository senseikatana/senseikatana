[katanakit-js](../index.md) / NotionConfigSchema

# Variable: NotionConfigSchema

```ts
const NotionConfigSchema: ZodObject<{
  apiBaseUrl: ZodOptional<ZodString>;
  apiVersion: ZodOptional<ZodString>;
  token: ZodString;
}, $strip>;
```

Defined in: [schemas/notion.schema.ts:6](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/notion.schema.ts#L6)

Config for the Notion API integration.

[katanakit-js](../index.md) / NotionConfigSchema

# Variable: NotionConfigSchema

```ts
const NotionConfigSchema: ZodObject<{
  apiBaseUrl: ZodOptional<ZodString>;
  apiVersion: ZodOptional<ZodString>;
  token: ZodString;
}, $strip>;
```

Defined in: [schemas/notion.schema.ts:6](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/notion.schema.ts#L6)

Config for the Notion API integration.

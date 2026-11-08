[katanakit-js](../index.md) / NotionConfigSchema

# Variable: NotionConfigSchema

```ts
const NotionConfigSchema: ZodObject<{
  apiBaseUrl: ZodOptional<ZodString>;
  apiVersion: ZodOptional<ZodString>;
  token: ZodString;
}, $strip>;
```

Defined in: [schemas/notion.schema.ts:6](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/notion.schema.ts#L6)

Config for the Notion API integration.

[katanakit-js](../index.md) / NotionConfigSchema

# Variable: NotionConfigSchema

```ts
const NotionConfigSchema: ZodObject<{
  apiBaseUrl: ZodOptional<ZodString>;
  apiVersion: ZodOptional<ZodString>;
  token: ZodString;
}, $strip>;
```

Defined in: [schemas/notion.schema.ts:6](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/notion.schema.ts#L6)

Config for the Notion API integration.

[katanakit-js](../index.md) / NotionPropertySchemaSchema

# Variable: NotionPropertySchemaSchema

```ts
const NotionPropertySchemaSchema: ZodObject<{
  id: ZodOptional<ZodString>;
  name: ZodOptional<ZodString>;
  type: ZodString;
}, $catchall<ZodUnknown>>;
```

Defined in: [schemas/notion.schema.ts:157](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/notion.schema.ts#L157)

Schema definition for a database property.

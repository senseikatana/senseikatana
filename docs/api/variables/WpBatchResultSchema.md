[katanakit-js](../index.md) / WpBatchResultSchema

# Variable: WpBatchResultSchema

```ts
const WpBatchResultSchema: ZodObject<{
  responses: ZodArray<ZodObject<{
     body: ZodUnknown;
     headers: ZodRecord<ZodString, ZodString>;
     status: ZodNumber;
  }, $catchall<ZodUnknown>>>;
}, $catchall<ZodUnknown>>;
```

Defined in: [schemas/wordpress.schema.ts:633](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/wordpress.schema.ts#L633)

Result of a WordPress batch operation.

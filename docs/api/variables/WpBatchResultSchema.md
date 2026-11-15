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

Defined in: [schemas/wordpress.schema.ts:633](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/wordpress.schema.ts#L633)

Result of a WordPress batch operation.

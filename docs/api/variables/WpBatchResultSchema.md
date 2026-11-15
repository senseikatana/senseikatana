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

Defined in: [schemas/wordpress.schema.ts:633](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/wordpress.schema.ts#L633)

Result of a WordPress batch operation.

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

Defined in: [schemas/wordpress.schema.ts:633](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/wordpress.schema.ts#L633)

Result of a WordPress batch operation.

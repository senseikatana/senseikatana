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

Defined in: [schemas/wordpress.schema.ts:633](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/wordpress.schema.ts#L633)

Result of a WordPress batch operation.

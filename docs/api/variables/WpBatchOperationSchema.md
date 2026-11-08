[katanakit-js](../index.md) / WpBatchOperationSchema

# Variable: WpBatchOperationSchema

```ts
const WpBatchOperationSchema: ZodObject<{
  body: ZodOptional<ZodUnknown>;
  headers: ZodOptional<ZodRecord<ZodString, ZodString>>;
  method: ZodString;
  path: ZodString;
}, $strip>;
```

Defined in: [schemas/wordpress.schema.ts:625](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/wordpress.schema.ts#L625)

A single operation in a WordPress batch request.

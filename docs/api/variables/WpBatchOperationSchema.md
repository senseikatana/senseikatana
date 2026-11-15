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

Defined in: [schemas/wordpress.schema.ts:625](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/wordpress.schema.ts#L625)

A single operation in a WordPress batch request.

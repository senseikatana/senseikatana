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

Defined in: [schemas/wordpress.schema.ts:625](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/wordpress.schema.ts#L625)

A single operation in a WordPress batch request.

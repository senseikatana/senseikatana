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

Defined in: [schemas/wordpress.schema.ts:625](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/wordpress.schema.ts#L625)

A single operation in a WordPress batch request.

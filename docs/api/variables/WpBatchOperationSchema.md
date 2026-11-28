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

Defined in: [schemas/wordpress.schema.ts:625](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/wordpress.schema.ts#L625)

A single operation in a WordPress batch request.

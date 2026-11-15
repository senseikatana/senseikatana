[katanakit-js](../index.md) / WpErrorSchema

# Variable: WpErrorSchema

```ts
const WpErrorSchema: ZodObject<{
  code: ZodString;
  data: ZodOptional<ZodObject<{
     status: ZodNumber;
  }, $catchall<ZodUnknown>>>;
  message: ZodString;
}, $catchall<ZodUnknown>>;
```

Defined in: [schemas/wordpress.schema.ts:597](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/wordpress.schema.ts#L597)

WordPress REST API error response.

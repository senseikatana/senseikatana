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

Defined in: [schemas/wordpress.schema.ts:597](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/wordpress.schema.ts#L597)

WordPress REST API error response.

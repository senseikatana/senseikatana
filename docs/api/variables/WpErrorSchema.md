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

Defined in: [schemas/wordpress.schema.ts:597](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/wordpress.schema.ts#L597)

WordPress REST API error response.

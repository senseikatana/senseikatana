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

Defined in: [schemas/wordpress.schema.ts:597](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/wordpress.schema.ts#L597)

WordPress REST API error response.

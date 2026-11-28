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

Defined in: [schemas/wordpress.schema.ts:597](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/wordpress.schema.ts#L597)

WordPress REST API error response.

[katanakit-js](../index.md) / WpSearchListSchema

# Variable: WpSearchListSchema

```ts
const WpSearchListSchema: ZodArray<ZodObject<{
  id: ZodNumber;
  subtype: ZodString;
  title: ZodString;
  type: ZodString;
  url: ZodString;
}, $catchall<ZodUnknown>>>;
```

Defined in: [schemas/wordpress.schema.ts:622](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/wordpress.schema.ts#L622)

List of search results.

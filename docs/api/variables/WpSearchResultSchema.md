[katanakit-js](../index.md) / WpSearchResultSchema

# Variable: WpSearchResultSchema

```ts
const WpSearchResultSchema: ZodObject<{
  id: ZodNumber;
  subtype: ZodString;
  title: ZodString;
  type: ZodString;
  url: ZodString;
}, $catchall<ZodUnknown>>;
```

Defined in: [schemas/wordpress.schema.ts:611](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/wordpress.schema.ts#L611)

WordPress search result item.

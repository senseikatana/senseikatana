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

Defined in: [schemas/wordpress.schema.ts:611](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/wordpress.schema.ts#L611)

WordPress search result item.

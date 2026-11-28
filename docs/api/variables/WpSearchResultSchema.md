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

Defined in: [schemas/wordpress.schema.ts:611](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/wordpress.schema.ts#L611)

WordPress search result item.

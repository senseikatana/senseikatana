[katanakit-js](../index.md) / WpEmbedded

# Type Alias: WpEmbedded

```ts
type WpEmbedded = z.infer<typeof WpEmbeddedSchema>;
```

Defined in: [types/wordpress/types.ts:183](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L183)

Embedded resources returned by WordPress when `_embed` is used.

Contains related entities: author, featured media, terms, replies.
Access with `post._embedded?.["wp:featuredmedia"]?.[0]`.

## Example

```ts
const result = await onWpGetPosts({ _embed: "author,wp:featuredmedia" });
if (result.ok) {
  for (const post of result.data) {
    const author = post._embedded?.author?.[0]?.name;
    const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  }
}
```

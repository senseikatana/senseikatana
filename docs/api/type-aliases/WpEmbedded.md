[katanakit-js](../index.md) / WpEmbedded

# Type Alias: WpEmbedded

```ts
type WpEmbedded = z.infer<typeof WpEmbeddedSchema>;
```

Defined in: [types/adapters/wordpress.ts:183](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/adapters/wordpress.ts#L183)

Embedded resources returned by WordPress when `_embed` is used.

Contains related entities: author, featured media, terms, replies.
Access with `post._embedded?.["wp:featuredmedia"]?.[0]`.

## Example

```ts
const result = await useWpGetPosts({ _embed: "author,wp:featuredmedia" });
if (result.ok) {
  for (const post of result.data) {
    const author = post._embedded?.author?.[0]?.name;
    const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  }
}
```

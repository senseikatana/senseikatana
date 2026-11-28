[katanakit-js](../index.md) / WpAcfFields

# Type Alias: WpAcfFields

```ts
type WpAcfFields = z.infer<typeof WpAcfFieldsSchema>;
```

Defined in: [types/adapters/wordpress.ts:164](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/types/adapters/wordpress.ts#L164)

Container for ACF (Advanced Custom Fields) fields on a WordPress entity.

ACF fields appear on posts, pages, media, taxonomies, users, and options.
Field names and types are defined by the site's ACF configuration.

## Example

```ts
const post = await useWpGetPost(42, { _fields: "id,title,acf" });
if (post.ok && post.data.acf) {
  console.log(post.data.acf.hero_image);     // image field
  console.log(post.data.acf.subtitle);        // text field
  console.log(post.data.acf.gallery);         // gallery field (array)
}
```

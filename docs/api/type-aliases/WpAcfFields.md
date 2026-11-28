[katanakit-js](../index.md) / WpAcfFields

# Type Alias: WpAcfFields

```ts
type WpAcfFields = z.infer<typeof WpAcfFieldsSchema>;
```

Defined in: [types/wordpress/types.ts:164](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/wordpress/types.ts#L164)

Container for ACF (Advanced Custom Fields) fields on a WordPress entity.

ACF fields appear on posts, pages, media, taxonomies, users, and options.
Field names and types are defined by the site's ACF configuration.

## Example

```ts
const post = await onWpGetPost(42, { _fields: "id,title,acf" });
if (post.ok && post.data.acf) {
  console.log(post.data.acf.hero_image);     // image field
  console.log(post.data.acf.subtitle);        // text field
  console.log(post.data.acf.gallery);         // gallery field (array)
}
```

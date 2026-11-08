[katanakit-js](../index.md) / UseSeoMetaOptions

# Type Alias: UseSeoMetaOptions\<OmitKeys\>

```ts
type UseSeoMetaOptions<OmitKeys> = Omit<UseSeoMetaBase, OmitKeys>;
```

Defined in: [config/seo-meta.types.ts:177](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/config/seo-meta.types.ts#L177)

Public options for [useSeoMeta](../functions/useSeoMeta.md).
HTML, Open Graph, Twitter/X card and site fields in one object.
Omit keys you do not want in the type.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `OmitKeys` *extends* keyof [`UseSeoMetaBase`](UseSeoMetaBase.md) | `never` |

## Example

```ts
// site = URL, siteTitle = brand, title = this page
useSeoMeta({
  site: "https://katanakit.dev",
  siteTitle: "KatanaKit",
  title: "Getting started", // → <title>Getting started | KatanaKit</title>
  description: "…",
  ogImage: "/og.png",
} satisfies UseSeoMetaOptions);

useSeoMeta({ title: "Home" } as UseSeoMetaOptions<"rss" | "nav">);
```

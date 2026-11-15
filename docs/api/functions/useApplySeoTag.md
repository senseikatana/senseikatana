[katanakit-js](../index.md) / useApplySeoTag

# Function: useApplySeoTag()

```ts
function useApplySeoTag(seo, head?): void;
```

Defined in: [config/seo.service.ts:271](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/config/seo.service.ts#L271)

Applies tags from a [SeoTagResult](../type-aliases/SeoTagResult.md) into `document.head` (Vanilla / SPA).
No-op when `document` is unavailable (SSR).

## Parameters

| Parameter | Type |
| ------ | ------ |
| `seo` | [`SeoTagResult`](../type-aliases/SeoTagResult.md) |
| `head?` | `ParentNode` \| `null` |

## Returns

`void`

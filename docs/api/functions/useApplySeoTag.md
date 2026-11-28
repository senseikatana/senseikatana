[katanakit-js](../index.md) / useApplySeoTag

# Function: useApplySeoTag()

```ts
function useApplySeoTag(seo, head?): void;
```

Defined in: [config/seo.service.ts:271](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/config/seo.service.ts#L271)

Applies tags from a [SeoTagResult](../type-aliases/SeoTagResult.md) into `document.head` (Vanilla / SPA).
No-op when `document` is unavailable (SSR).

## Parameters

| Parameter | Type |
| ------ | ------ |
| `seo` | [`SeoTagResult`](../type-aliases/SeoTagResult.md) |
| `head?` | `ParentNode` \| `null` |

## Returns

`void`

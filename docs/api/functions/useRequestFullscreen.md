[katanakit-js](../index.md) / useRequestFullscreen

# Function: useRequestFullscreen()

```ts
function useRequestFullscreen(target?): Promise<void>;
```

Defined in: [infrastructure/viewport/viewport.service.ts:285](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/infrastructure/viewport/viewport.service.ts#L285)

Requests fullscreen on the given element (or the document root).

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `target?` | `HTMLElement` | The element to make fullscreen (defaults to `document.documentElement`). |

## Returns

`Promise`\<`void`\>

## Throws

If fullscreen is not supported.

## Example

```ts
await useRequestFullscreen(videoElement);
```

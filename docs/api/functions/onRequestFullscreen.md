[katanakit-js](../index.md) / onRequestFullscreen

# Function: onRequestFullscreen()

```ts
function onRequestFullscreen(target?): Promise<void>;
```

Defined in: [infrastructure/viewport/viewport.service.ts:283](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/viewport/viewport.service.ts#L283)

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
await onRequestFullscreen(videoElement);
```

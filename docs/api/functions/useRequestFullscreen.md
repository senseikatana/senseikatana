[katanakit-js](../index.md) / useRequestFullscreen

# Function: useRequestFullscreen()

```ts
function useRequestFullscreen(target?): Promise<void>;
```

Defined in: [infrastructure/viewport/viewport.service.ts:285](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/viewport/viewport.service.ts#L285)

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

[katanakit-js](../index.md) / onScrollToElement

# Function: onScrollToElement()

```ts
function onScrollToElement(target, options?): boolean;
```

Defined in: [infrastructure/viewport/viewport.service.ts:201](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/viewport/viewport.service.ts#L201)

Scrolls an element into view.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `target` | `string` \| `HTMLElement` | An HTMLElement or a CSS selector string. |
| `options?` | [`ScrollOptions`](../interfaces/ScrollOptions.md) | Scroll options (`behavior`, `block`, `inline`). |

## Returns

`boolean`

`true` if the element was found and scrolled to.

## Example

```ts
onScrollToElement("#section-2", { behavior: "smooth", block: "start" });
```

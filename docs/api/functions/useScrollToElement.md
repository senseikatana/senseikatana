[katanakit-js](../index.md) / useScrollToElement

# Function: useScrollToElement()

```ts
function useScrollToElement(target, options?): boolean;
```

Defined in: [infrastructure/viewport/viewport.service.ts:201](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/infrastructure/viewport/viewport.service.ts#L201)

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
useScrollToElement("#section-2", { behavior: "smooth", block: "start" });
```

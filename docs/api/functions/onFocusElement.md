[katanakit-js](../index.md) / onFocusElement

# Function: onFocusElement()

```ts
function onFocusElement(target): boolean;
```

Defined in: [infrastructure/viewport/viewport.service.ts:247](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/viewport/viewport.service.ts#L247)

Focuses an element.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `target` | `string` \| `HTMLElement` | An HTMLElement or a CSS selector string. |

## Returns

`boolean`

`true` if the element was found and focused.

## Example

```ts
onFocusElement("#search-input");
```

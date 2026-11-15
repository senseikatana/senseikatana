[katanakit-js](../index.md) / useFocusElement

# Function: useFocusElement()

```ts
function useFocusElement(target): boolean;
```

Defined in: [infrastructure/viewport/viewport.service.ts:247](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/infrastructure/viewport/viewport.service.ts#L247)

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
useFocusElement("#search-input");
```

[katanakit-js](../index.md) / useFocusElement

# Function: useFocusElement()

```ts
function useFocusElement(target): boolean;
```

Defined in: [infrastructure/viewport/viewport.service.ts:247](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/infrastructure/viewport/viewport.service.ts#L247)

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

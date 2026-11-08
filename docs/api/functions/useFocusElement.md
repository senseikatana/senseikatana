[katanakit-js](../index.md) / useFocusElement

# Function: useFocusElement()

```ts
function useFocusElement(target): boolean;
```

Defined in: [infrastructure/viewport/viewport.service.ts:247](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/viewport/viewport.service.ts#L247)

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

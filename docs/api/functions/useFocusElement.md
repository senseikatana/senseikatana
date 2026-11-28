[katanakit-js](../index.md) / useFocusElement

# Function: useFocusElement()

```ts
function useFocusElement(target): boolean;
```

Defined in: [infrastructure/viewport/viewport.service.ts:247](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/viewport/viewport.service.ts#L247)

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

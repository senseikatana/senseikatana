[katanakit-js](../index.md) / onCreateElement

# Function: onCreateElement()

```ts
function onCreateElement<T>(tagName, options?): HTMLElementTagNameMap[T];
```

Defined in: [infrastructure/dom/dom.service.ts:392](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/dom/dom.service.ts#L392)

Creates a new HTML element.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` *extends* keyof `HTMLElementTagNameMap` | The tag name from `HTMLElementTagNameMap`. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `tagName` | `T` | The tag name to create. |
| `options?` | `ElementCreationOptions` | Optional element creation options. |

## Returns

`HTMLElementTagNameMap`\[`T`\]

The newly created element.

## Throws

If called outside a browser environment.

## Example

```ts
const div = onCreateElement("div");
const input = onCreateElement("input", { is: "custom-input" });
```

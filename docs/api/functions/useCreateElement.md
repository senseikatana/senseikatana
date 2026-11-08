[katanakit-js](../index.md) / useCreateElement

# Function: useCreateElement()

```ts
function useCreateElement<T>(tagName, options?): HTMLElementTagNameMap[T];
```

Defined in: [infrastructure/dom/dom.service.ts:392](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/dom/dom.service.ts#L392)

Creates a new HTML element.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* keyof `HTMLElementTagNameMap` | The tag name from `HTMLElementTagNameMap`. |

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
const div = useCreateElement("div");
const input = useCreateElement("input", { is: "custom-input" });
```

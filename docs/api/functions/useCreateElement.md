[katanakit-js](../index.md) / useCreateElement

# Function: useCreateElement()

```ts
function useCreateElement<T>(tagName, options?): HTMLElementTagNameMap[T];
```

Defined in: [infrastructure/dom/dom.service.ts:392](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/infrastructure/dom/dom.service.ts#L392)

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
const div = useCreateElement("div");
const input = useCreateElement("input", { is: "custom-input" });
```

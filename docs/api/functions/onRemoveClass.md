[katanakit-js](../index.md) / onRemoveClass

# Function: onRemoveClass()

```ts
function onRemoveClass(target, className): void;
```

Defined in: [infrastructure/dom/dom.service.ts:169](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/dom/dom.service.ts#L169)

Removes CSS class(es) from the target element.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `target` | `string` \| `Element` | A CSS selector string or an Element instance. |
| `className` | `string` \| `string`[] | A single class name or an array of class names to remove. |

## Returns

`void`

## Example

```ts
onRemoveClass("#header", "sticky");
onRemoveClass(myElement, ["visible", "active"]);
```

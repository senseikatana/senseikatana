[katanakit-js](../index.md) / onRemoveAttribute

# Function: onRemoveAttribute()

```ts
function onRemoveAttribute(target, attr): void;
```

Defined in: [infrastructure/dom/dom.service.ts:301](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/dom/dom.service.ts#L301)

Removes an attribute from the target element.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `target` | `string` \| `Element` | A CSS selector string or an Element instance. |
| `attr` | `string` | The attribute name to remove. |

## Returns

`void`

## Example

```ts
onRemoveAttribute("input", "disabled");
```

[katanakit-js](../index.md) / onAddClass

# Function: onAddClass()

```ts
function onAddClass(target, className): void;
```

Defined in: [infrastructure/dom/dom.service.ts:153](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/dom/dom.service.ts#L153)

Adds one or more CSS classes to the target element.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `target` | `string` \| `Element` | A CSS selector string or an Element instance. |
| `className` | `string` | The class name to add. |

## Returns

`void`

## Example

```ts
onAddClass("#header", "sticky");
onAddClass(myElement, "visible");
```

[katanakit-js](../index.md) / onToggleClass

# Function: onToggleClass()

```ts
function onToggleClass(
   target, 
   className, 
   force?
): boolean | undefined;
```

Defined in: [infrastructure/dom/dom.service.ts:193](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/dom/dom.service.ts#L193)

Toggles a CSS class on the target element.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `target` | `string` \| `Element` | A CSS selector string or an Element instance. |
| `className` | `string` | The class name to toggle. |
| `force?` | `boolean` | If provided, forces the class on (`true`) or off (`false`). |

## Returns

`boolean` \| `undefined`

`true` if the class is now present, `false` if removed, or `undefined` if element not found.

## Example

```ts
onToggleClass(".sidebar", "open");
onToggleClass(".sidebar", "hidden", false);
```

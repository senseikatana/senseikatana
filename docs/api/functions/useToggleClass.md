[katanakit-js](../index.md) / useToggleClass

# Function: useToggleClass()

```ts
function useToggleClass(
   target, 
   className, 
   force?
): boolean | undefined;
```

Defined in: [infrastructure/dom/dom.service.ts:193](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/infrastructure/dom/dom.service.ts#L193)

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
useToggleClass(".sidebar", "open");
useToggleClass(".sidebar", "hidden", false);
```

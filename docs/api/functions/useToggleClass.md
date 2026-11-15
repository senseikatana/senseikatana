[katanakit-js](../index.md) / useToggleClass

# Function: useToggleClass()

```ts
function useToggleClass(
   target, 
   className, 
   force?
): boolean | undefined;
```

Defined in: [infrastructure/dom/dom.service.ts:193](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/infrastructure/dom/dom.service.ts#L193)

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

[katanakit-js](../index.md) / useRemoveClass

# Function: useRemoveClass()

```ts
function useRemoveClass(target, className): void;
```

Defined in: [infrastructure/dom/dom.service.ts:169](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/infrastructure/dom/dom.service.ts#L169)

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
useRemoveClass("#header", "sticky");
useRemoveClass(myElement, ["visible", "active"]);
```

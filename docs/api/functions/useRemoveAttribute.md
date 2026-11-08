[katanakit-js](../index.md) / useRemoveAttribute

# Function: useRemoveAttribute()

```ts
function useRemoveAttribute(target, attr): void;
```

Defined in: [infrastructure/dom/dom.service.ts:301](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/dom/dom.service.ts#L301)

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
useRemoveAttribute("input", "disabled");
```

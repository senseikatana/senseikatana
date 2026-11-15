[katanakit-js](../index.md) / useRemove

# Function: useRemove()

```ts
function useRemove(target): void;
```

Defined in: [infrastructure/dom/dom.service.ts:470](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/infrastructure/dom/dom.service.ts#L470)

Removes the target element from the DOM.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `target` | `string` \| `Element` | A CSS selector string or an Element instance. |

## Returns

`void`

## Example

```ts
useRemove(".modal-overlay");
```

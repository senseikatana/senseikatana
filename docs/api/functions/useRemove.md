[katanakit-js](../index.md) / useRemove

# Function: useRemove()

```ts
function useRemove(target): void;
```

Defined in: [infrastructure/dom/dom.service.ts:470](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/dom/dom.service.ts#L470)

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

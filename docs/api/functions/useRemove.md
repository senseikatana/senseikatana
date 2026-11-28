[katanakit-js](../index.md) / useRemove

# Function: useRemove()

```ts
function useRemove(target): void;
```

Defined in: [infrastructure/dom/dom.service.ts:470](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/dom/dom.service.ts#L470)

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

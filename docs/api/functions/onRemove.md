[katanakit-js](../index.md) / onRemove

# Function: onRemove()

```ts
function onRemove(target): void;
```

Defined in: [infrastructure/dom/dom.service.ts:470](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/dom/dom.service.ts#L470)

Removes the target element from the DOM.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `target` | `string` \| `Element` | A CSS selector string or an Element instance. |

## Returns

`void`

## Example

```ts
onRemove(".modal-overlay");
```

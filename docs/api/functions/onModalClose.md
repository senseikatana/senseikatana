[katanakit-js](../index.md) / onModalClose

# Function: onModalClose()

```ts
function onModalClose(modalSelector, onRemoveDOM?): void;
```

Defined in: [infrastructure/dom/dom.service.ts:490](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/dom/dom.service.ts#L490)

Closes a modal by adding the "hidden" class or removing it from the DOM.
Clicking outside the modal or calling this function will hide it.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `modalSelector` | `string` | `undefined` | A CSS selector string for the modal element. |
| `onRemoveDOM?` | `boolean` | `false` | If `true`, removes the modal from the DOM entirely. If `false`, only adds the "hidden" class (CSS `display: none`). |

## Returns

`void`

## Example

```ts
// Hide modal with CSS hidden class (keeps element in DOM)
onModalClose(".modal-overlay", false);

// Remove modal from DOM completely
onModalClose(".modal-overlay", true);
```

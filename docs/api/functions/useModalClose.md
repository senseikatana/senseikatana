[katanakit-js](../index.md) / useModalClose

# Function: useModalClose()

```ts
function useModalClose(modalSelector, useRemoveDOM?): void;
```

Defined in: [infrastructure/dom/dom.service.ts:490](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/dom/dom.service.ts#L490)

Closes a modal by adding the "hidden" class or removing it from the DOM.
Clicking outside the modal or calling this function will hide it.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `modalSelector` | `string` | `undefined` | A CSS selector string for the modal element. |
| `useRemoveDOM` | `boolean` | `false` | If `true`, removes the modal from the DOM entirely. If `false`, only adds the "hidden" class (CSS `display: none`). |

## Returns

`void`

## Example

```ts
// Hide modal with CSS hidden class (keeps element in DOM)
useModalClose(".modal-overlay", false);

// Remove modal from DOM completely
useModalClose(".modal-overlay", true);
```

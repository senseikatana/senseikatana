[katanakit-js](../index.md) / onOnVisibilityChange

# Function: onOnVisibilityChange()

```ts
function onOnVisibilityChange(callback): () => void;
```

Defined in: [infrastructure/viewport/viewport.service.ts:329](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/viewport/viewport.service.ts#L329)

Registers a callback for document visibility changes.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | (`isVisible`) => `void` | Called with `true` when visible, `false` when hidden. |

## Returns

A cleanup function that removes the listener.

() => `void`

## Example

```ts
const off = onOnVisibilityChange((visible) => {
  if (visible) resumePolling();
  else pausePolling();
});
```

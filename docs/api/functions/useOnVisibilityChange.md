[katanakit-js](../index.md) / useOnVisibilityChange

# Function: useOnVisibilityChange()

```ts
function useOnVisibilityChange(callback): () => void;
```

Defined in: [infrastructure/viewport/viewport.service.ts:333](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/viewport/viewport.service.ts#L333)

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
const off = useOnVisibilityChange((visible) => {
  if (visible) resumePolling();
  else pausePolling();
});
```

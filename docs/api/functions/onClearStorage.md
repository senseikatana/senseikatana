[katanakit-js](../index.md) / onClearStorage

# Function: onClearStorage()

```ts
function onClearStorage(target?): void;
```

Defined in: [infrastructure/storage/storage.service.ts:392](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/storage/storage.service.ts#L392)

Clears all values from the specified storage backend.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `target?` | `"localStorage"` \| `"sessionStorage"` | `"localStorage"` | Which storage backend to clear (default: `"localStorage"`). |

## Returns

`void`

## Example

```ts
onClearStorage("sessionStorage");
```

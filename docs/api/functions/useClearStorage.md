[katanakit-js](../index.md) / useClearStorage

# Function: useClearStorage()

```ts
function useClearStorage(target?): void;
```

Defined in: [infrastructure/storage/storage.service.ts:399](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/infrastructure/storage/storage.service.ts#L399)

Clears all values from the specified storage backend.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `target?` | `"localStorage"` \| `"sessionStorage"` | `"localStorage"` | Which storage backend to clear (default: `"localStorage"`). |

## Returns

`void`

## Example

```ts
useClearStorage("sessionStorage");
```

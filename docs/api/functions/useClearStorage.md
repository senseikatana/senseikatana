[katanakit-js](../index.md) / useClearStorage

# Function: useClearStorage()

```ts
function useClearStorage(target?): void;
```

Defined in: [infrastructure/storage/storage.service.ts:399](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/infrastructure/storage/storage.service.ts#L399)

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

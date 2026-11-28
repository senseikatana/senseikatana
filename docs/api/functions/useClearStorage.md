[katanakit-js](../index.md) / useClearStorage

# Function: useClearStorage()

```ts
function useClearStorage(target?): void;
```

Defined in: [infrastructure/storage/storage.service.ts:399](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/storage/storage.service.ts#L399)

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

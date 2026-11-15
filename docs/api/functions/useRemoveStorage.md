[katanakit-js](../index.md) / useRemoveStorage

# Function: useRemoveStorage()

```ts
function useRemoveStorage(key, target?): void;
```

Defined in: [infrastructure/storage/storage.service.ts:386](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/infrastructure/storage/storage.service.ts#L386)

Removes a value from storage by key.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `key` | `string` | `undefined` | The storage key to remove. |
| `target?` | `"localStorage"` \| `"sessionStorage"` | `"localStorage"` | Which storage backend to use (default: `"localStorage"`). |

## Returns

`void`

## Example

```ts
useRemoveStorage("auth_token");
```

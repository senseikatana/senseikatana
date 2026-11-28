[katanakit-js](../index.md) / useRemoveStorage

# Function: useRemoveStorage()

```ts
function useRemoveStorage(key, target?): void;
```

Defined in: [infrastructure/storage/storage.service.ts:386](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/storage/storage.service.ts#L386)

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

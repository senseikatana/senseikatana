[katanakit-js](../index.md) / onRemoveStorage

# Function: onRemoveStorage()

```ts
function onRemoveStorage(key, target?): void;
```

Defined in: [infrastructure/storage/storage.service.ts:379](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/storage/storage.service.ts#L379)

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
onRemoveStorage("auth_token");
```

[katanakit-js](../index.md) / onGetStorage

# Function: onGetStorage()

```ts
function onGetStorage<T>(key, target?): T | null;
```

Defined in: [infrastructure/storage/storage.service.ts:344](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/storage/storage.service.ts#L344)

Retrieves a value from storage by key.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| <a id="type-parameter-t"></a> `T` | `unknown` | Expected value type. |

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `key` | `string` | `undefined` | The storage key. |
| `target?` | `"localStorage"` \| `"sessionStorage"` | `"localStorage"` | Which storage backend to use (default: `"localStorage"`). |

## Returns

`T` \| `null`

The deserialized value, or `null` if not found.

## Example

```ts
const token = onGetStorage<string>("auth_token");
const session = onGetStorage<SessionData>("session", "sessionStorage");
```

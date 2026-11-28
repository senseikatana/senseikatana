[katanakit-js](../index.md) / useGetStorage

# Function: useGetStorage()

```ts
function useGetStorage<T>(key, target?): T | null;
```

Defined in: [infrastructure/storage/storage.service.ts:351](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/storage/storage.service.ts#L351)

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
const token = useGetStorage<string>("auth_token");
const session = useGetStorage<SessionData>("session", "sessionStorage");
```

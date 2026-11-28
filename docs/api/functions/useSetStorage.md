[katanakit-js](../index.md) / useSetStorage

# Function: useSetStorage()

```ts
function useSetStorage(
   key, 
   value, 
   target?
): void;
```

Defined in: [infrastructure/storage/storage.service.ts:369](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/storage/storage.service.ts#L369)

Stores a value under the given key (serialized as JSON).

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `key` | `string` | `undefined` | The storage key. |
| `value` | `unknown` | `undefined` | The value to store. |
| `target?` | `"localStorage"` \| `"sessionStorage"` | `"localStorage"` | Which storage backend to use (default: `"localStorage"`). |

## Returns

`void`

## Example

```ts
useSetStorage("auth_token", "abc123");
useSetStorage("user", { name: "Alice" }, "sessionStorage");
```

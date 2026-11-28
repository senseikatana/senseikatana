[katanakit-js](../index.md) / onSetStorage

# Function: onSetStorage()

```ts
function onSetStorage(
   key, 
   value, 
   target?
): void;
```

Defined in: [infrastructure/storage/storage.service.ts:362](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/storage/storage.service.ts#L362)

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
onSetStorage("auth_token", "abc123");
onSetStorage("user", { name: "Alice" }, "sessionStorage");
```

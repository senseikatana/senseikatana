[katanakit-js](../index.md) / createMemoryStorage

# Function: createMemoryStorage()

```ts
function createMemoryStorage(): Storage;
```

Defined in: [infrastructure/storage/storage.service.ts:75](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/infrastructure/storage/storage.service.ts#L75)

Creates a new in-memory `Storage` instance used as an SSR / private-mode
fallback. Each call owns its own Map — never share one across requests.

## Returns

`Storage`

An object conforming to the Web Storage API.

## Example

```ts
const mem = createMemoryStorage();
mem.setItem("key", JSON.stringify({ a: 1 }));
```

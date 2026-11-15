[katanakit-js](../index.md) / createMemoryStorage

# Function: createMemoryStorage()

```ts
function createMemoryStorage(): Storage;
```

Defined in: [infrastructure/storage/storage.service.ts:75](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/infrastructure/storage/storage.service.ts#L75)

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

[katanakit-js](../index.md) / createMemoryStorage

# Function: createMemoryStorage()

```ts
function createMemoryStorage(): Storage;
```

Defined in: [infrastructure/storage/storage.service.ts:75](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/storage/storage.service.ts#L75)

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

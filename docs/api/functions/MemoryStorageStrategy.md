[katanakit-js](../index.md) / MemoryStorageStrategy

# Function: MemoryStorageStrategy()

```ts
function MemoryStorageStrategy(): StorageStrategy;
```

Defined in: [infrastructure/storage/storage.service.ts:149](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/storage/storage.service.ts#L149)

Creates a strategy backed by an in-memory store (SSR / private-mode fallback).

## Returns

[`StorageStrategy`](../interfaces/StorageStrategy.md)

A [StorageStrategy](../interfaces/StorageStrategy.md) using an in-memory `Storage` backend.

## Example

```ts
const strategy = MemoryStorageStrategy();
strategy.onSetItem("temp", "value");
```

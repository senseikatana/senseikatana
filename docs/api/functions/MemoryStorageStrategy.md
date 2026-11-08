[katanakit-js](../index.md) / MemoryStorageStrategy

# Function: MemoryStorageStrategy()

```ts
function MemoryStorageStrategy(): StorageStrategy;
```

Defined in: [infrastructure/storage/storage.service.ts:149](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/storage/storage.service.ts#L149)

Creates a strategy backed by an in-memory store (SSR / private-mode fallback).

## Returns

[`StorageStrategy`](../interfaces/StorageStrategy.md)

A [StorageStrategy](../interfaces/StorageStrategy.md) using an in-memory `Storage` backend.

## Example

```ts
const strategy = MemoryStorageStrategy();
strategy.useSetItem("temp", "value");
```

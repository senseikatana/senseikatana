[katanakit-js](../index.md) / SessionStorageStrategy

# Function: SessionStorageStrategy()

```ts
function SessionStorageStrategy(storage?): StorageStrategy;
```

Defined in: [infrastructure/storage/storage.service.ts:133](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/infrastructure/storage/storage.service.ts#L133)

Creates a strategy backed by `window.sessionStorage`.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `storage?` | `Storage` | Optional storage instance (defaults to `window.sessionStorage`). |

## Returns

[`StorageStrategy`](../interfaces/StorageStrategy.md)

A [StorageStrategy](../interfaces/StorageStrategy.md).

## Example

```ts
const strategy = SessionStorageStrategy();
strategy.useSetItem("session", data);
```

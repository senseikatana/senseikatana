[katanakit-js](../index.md) / SessionStorageStrategy

# Function: SessionStorageStrategy()

```ts
function SessionStorageStrategy(storage?): StorageStrategy;
```

Defined in: [infrastructure/storage/storage.service.ts:133](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/storage/storage.service.ts#L133)

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
strategy.onSetItem("session", data);
```

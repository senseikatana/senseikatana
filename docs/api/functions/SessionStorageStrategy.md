[katanakit-js](../index.md) / SessionStorageStrategy

# Function: SessionStorageStrategy()

```ts
function SessionStorageStrategy(storage?): StorageStrategy;
```

Defined in: [infrastructure/storage/storage.service.ts:133](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/storage/storage.service.ts#L133)

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

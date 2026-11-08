[katanakit-js](../index.md) / LocalStorageStrategy

# Function: LocalStorageStrategy()

```ts
function LocalStorageStrategy(storage?): StorageStrategy;
```

Defined in: [infrastructure/storage/storage.service.ts:116](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/storage/storage.service.ts#L116)

Creates a strategy backed by `window.localStorage`.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `storage?` | `Storage` | Optional storage instance (defaults to `window.localStorage`). |

## Returns

[`StorageStrategy`](../interfaces/StorageStrategy.md)

A [StorageStrategy](../interfaces/StorageStrategy.md).

## Example

```ts
const strategy = LocalStorageStrategy();
strategy.useSetItem("token", "abc123");
```

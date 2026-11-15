[katanakit-js](../index.md) / LocalStorageStrategy

# Function: LocalStorageStrategy()

```ts
function LocalStorageStrategy(storage?): StorageStrategy;
```

Defined in: [infrastructure/storage/storage.service.ts:116](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/infrastructure/storage/storage.service.ts#L116)

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

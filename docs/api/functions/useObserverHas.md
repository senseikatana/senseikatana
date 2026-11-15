[katanakit-js](../index.md) / useObserverHas

# Function: useObserverHas()

```ts
function useObserverHas(key): boolean;
```

Defined in: [infrastructure/observer/observer.service.ts:197](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/infrastructure/observer/observer.service.ts#L197)

Checks whether an observer with the given key exists.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | The observer key to check. |

## Returns

`boolean`

`true` if an observer is registered under the key.

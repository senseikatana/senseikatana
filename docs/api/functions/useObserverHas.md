[katanakit-js](../index.md) / useObserverHas

# Function: useObserverHas()

```ts
function useObserverHas(key): boolean;
```

Defined in: [infrastructure/observer/observer.service.ts:197](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/observer/observer.service.ts#L197)

Checks whether an observer with the given key exists.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | The observer key to check. |

## Returns

`boolean`

`true` if an observer is registered under the key.

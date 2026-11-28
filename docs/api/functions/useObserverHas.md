[katanakit-js](../index.md) / useObserverHas

# Function: useObserverHas()

```ts
function useObserverHas(key): boolean;
```

Defined in: [infrastructure/observer/observer.service.ts:197](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/observer/observer.service.ts#L197)

Checks whether an observer with the given key exists.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | The observer key to check. |

## Returns

`boolean`

`true` if an observer is registered under the key.

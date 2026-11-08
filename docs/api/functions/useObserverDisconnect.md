[katanakit-js](../index.md) / useObserverDisconnect

# Function: useObserverDisconnect()

```ts
function useObserverDisconnect(key): void;
```

Defined in: [infrastructure/observer/observer.service.ts:168](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/observer/observer.service.ts#L168)

Disconnects and removes an observer by key, cleaning up all observed targets.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | The observer key to disconnect. |

## Returns

`void`

## Example

```ts
useObserverDisconnect("hero");
```

[katanakit-js](../index.md) / onObserverDisconnect

# Function: onObserverDisconnect()

```ts
function onObserverDisconnect(key): void;
```

Defined in: [infrastructure/observer/observer.service.ts:168](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/observer/observer.service.ts#L168)

Disconnects and removes an observer by key, cleaning up all observed targets.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | The observer key to disconnect. |

## Returns

`void`

## Example

```ts
onObserverDisconnect("hero");
```

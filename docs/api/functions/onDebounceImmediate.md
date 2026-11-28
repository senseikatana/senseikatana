[katanakit-js](../index.md) / onDebounceImmediate

# Function: onDebounceImmediate()

```ts
function onDebounceImmediate<T>(func, delayMs): (...args) => void;
```

Defined in: [core/services/timing.service.ts:474](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/timing.service.ts#L474)

Leading-edge debounce. See [TimingService.onDebounceImmediate](../classes/TimingService.md#ondebounceimmediate).

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` *extends* (...`args`) => `unknown` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `func` | `T` |
| `delayMs` | `number` |

## Returns

(...`args`) => `void`

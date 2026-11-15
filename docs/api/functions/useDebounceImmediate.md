[katanakit-js](../index.md) / useDebounceImmediate

# Function: useDebounceImmediate()

```ts
function useDebounceImmediate<T>(func, delayMs): (...args) => void;
```

Defined in: [core/services/timing.service.ts:474](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/core/services/timing.service.ts#L474)

Leading-edge debounce. See [TimingService.useDebounceImmediate](../classes/TimingService.md#usedebounceimmediate).

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

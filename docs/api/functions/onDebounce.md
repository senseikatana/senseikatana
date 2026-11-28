[katanakit-js](../index.md) / onDebounce

# Function: onDebounce()

```ts
function onDebounce<T>(func, delayMs): (...args) => void;
```

Defined in: [core/services/timing.service.ts:466](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/timing.service.ts#L466)

Trailing-edge debounce. See [TimingService.onDebounce](../classes/TimingService.md#ondebounce).

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

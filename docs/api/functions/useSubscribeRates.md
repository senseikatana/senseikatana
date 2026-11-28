[katanakit-js](../index.md) / useSubscribeRates

# Function: useSubscribeRates()

```ts
function useSubscribeRates(events): () => void;
```

Defined in: [infrastructure/currency/currency.service.ts:131](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/currency/currency.service.ts#L131)

Subscribes to rate events (Observer).

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `events` | [`CurrencyRateEvents`](../interfaces/CurrencyRateEvents.md) | Handlers, `onRatesUpdate` and/or `onRatesError`. |

## Returns

An unsubscribe function.

() => `void`

## Example

```ts
import { useSubscribeRates } from "katanakit-js";

const off = useSubscribeRates({ onRatesUpdate: (s) => render(s) });
off();
```

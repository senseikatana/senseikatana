[katanakit-js](../index.md) / useSubscribeRates

# Function: useSubscribeRates()

```ts
function useSubscribeRates(events): () => void;
```

Defined in: [infrastructure/currency/currency.service.ts:131](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/infrastructure/currency/currency.service.ts#L131)

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

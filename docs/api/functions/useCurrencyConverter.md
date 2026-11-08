[katanakit-js](../index.md) / useCurrencyConverter

# Function: useCurrencyConverter()

```ts
function useCurrencyConverter(options?): CurrencyConverterService;
```

Defined in: [infrastructure/currency/currency.service.ts:36](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/currency/currency.service.ts#L36)

Wires the shared [CurrencyConverterService](../classes/CurrencyConverterService.md) with the default rate
source (Frankfurter) and returns it.

This is the composition point between the pure core service and the
infrastructure that performs the network I/O: the core only knows the
[ICurrencyRateProvider](../interfaces/ICurrencyRateProvider.md) port, so someone has to plug an implementation
in. Calling this once is that "someone" — and it is idempotent, so calling it
on every use is fine and a provider you injected yourself is never replaced.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`CurrencyConverterServiceOptions`](../interfaces/CurrencyConverterServiceOptions.md) | Provider and cache TTL. `ttlMs` is applied through `useSetTtlMs`, so it also works on the shared instance. |

## Returns

[`CurrencyConverterService`](../classes/CurrencyConverterService.md)

The shared [CurrencyConverterService](../classes/CurrencyConverterService.md) (Singleton).

## Example

```ts
import { useCurrencyConverter } from "katanakit-js";

const currency = useCurrencyConverter();
const unsubscribe = currency.useSubscribe({ onRatesUpdate: (s) => render(s) });
```

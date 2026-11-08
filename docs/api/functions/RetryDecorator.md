[katanakit-js](../index.md) / RetryDecorator

# Function: RetryDecorator()

```ts
function RetryDecorator<T>(
   fn, 
   retries?, 
   delayMs?
): T;
```

Defined in: [infrastructure/decorators/retry.decorator.ts:36](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/decorators/retry.decorator.ts#L36)

RetryDecorator - Decorator Pattern para reintentos.

Envuelve una función asíncrona y la re-ejecuta cuando lanza, con un
intervalo fijo entre intentos. No modifica la función original: la
decoración se aplica en tiempo de composición (Open/Closed).

Nota: el nombre usa mayúscula inicial porque es un decorador composible,
no una función utilitaria (`use*`) del API pública.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* (...`args`) => `Promise`\<`unknown`\> | Tipo de la función envuelta. |

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `fn` | `T` | `undefined` | La función asíncrona a decorar. |
| `retries` | `number` | `3` | Número máximo de reintentos adicionales (default `3`). |
| `delayMs` | `number` | `1000` | Intervalo entre intentos en ms (default `1000`). |

## Returns

`T`

La función decorada con reintentos.

## Examples

```ts
import { RetryDecorator } from "katanakit-js";

const fetchWithRetry = RetryDecorator(() => fetch("/api"), 3, 500);
// reintenta hasta 3 veces con 500ms de espera antes de propagar el error
await fetchWithRetry();
```

**Composición con otros decoradores**

```ts
const robust = RetryDecorator(LoggerDecorator(flakyRequest), 2, 200);
```

## Remarks

Only **thrown** errors trigger a retry. KatanaKit's Safe Result
helpers (`useFetch`, `useGet`, ...) never throw — they return `{ ok: false }`
— so they are not retried as-is. To retry those, make `fn` throw on failure
(e.g. unwrap with `useSafeQueryFn`) or check `result.ok` inside `fn`.

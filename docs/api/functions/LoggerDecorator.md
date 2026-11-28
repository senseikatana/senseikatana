[katanakit-js](../index.md) / LoggerDecorator

# Function: LoggerDecorator()

```ts
function LoggerDecorator<T>(
   fn, 
   label?, 
   level?
): T;
```

Defined in: [infrastructure/decorators/logger.decorator.ts:39](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/decorators/logger.decorator.ts#L39)

LoggerDecorator - Decorator Pattern para trazado de llamadas.

Envuelve una función (sync o async) y registra cada invocación con sus
argumentos, el resultado y la duración. No modifica la función original:
el logging se añade en tiempo de composición (Open/Closed).

Nota: el nombre usa mayúscula inicial porque es un decorador composible,
no una función utilitaria (`use*`) del API pública.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` *extends* (...`args`) => `unknown` | Tipo de la función envuelta. |

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `fn` | `T` | `undefined` | La función a decorar. |
| `label?` | `string` | `undefined` | Nombre legible que aparece en los logs (default: `fn.name`). |
| `level?` | `"error"` \| `"log"` \| `"warn"` | `"log"` | Nivel de log para el resultado (default: `"log"`). |

## Returns

`T`

La función decorada con logging.

## Examples

```ts
import { LoggerDecorator } from "katanakit-js";

const traced = LoggerDecorator(fetchUser, "fetchUser");
await traced(1);
// [fetchUser] start { args: [1] }
// [fetchUser] ok (12ms) { result: {...} }
```

**Composición**

```ts
const robust = RetryDecorator(LoggerDecorator(flakyRequest, "flaky"), 2);
```

## Remarks

**Security**: arguments and results are logged verbatim. Do NOT
decorate functions that receive secrets (API keys, tokens, passwords) —
wrap a redacting adapter instead, or strip sensitive fields before calling.

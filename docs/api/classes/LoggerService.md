[katanakit-js](../index.md) / LoggerService

# Class: LoggerService

Defined in: [core/services/logger.service.ts:7](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/logger.service.ts#L7)

LoggerService - Singleton para logging
Aplica el patrón Singleton para garantizar una única instancia de logger.

## Methods

### useClear()

```ts
useClear(): void;
```

Defined in: [core/services/logger.service.ts:104](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/logger.service.ts#L104)

Clears the console.

#### Returns

`void`

#### Example

```ts
useLoggerClear();
```

***

### useLog()

```ts
useLog(
   message, 
   data?, 
   level?
): void;
```

Defined in: [core/services/logger.service.ts:58](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/logger.service.ts#L58)

Logs a message with optional data and level.
Maps directly onto the native `console` methods (`log`, `warn`, `error`).

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `message` | `string` | `undefined` | The message to log. |
| `data?` | `unknown` | `undefined` | Optional data to attach to the log. |
| `level?` | `"error"` \| `"log"` \| `"warn"` | `"log"` | The log level. Defaults to `"log"`. |

#### Returns

`void`

#### Example

```ts
import { useLogger } from "katanakit-js";

useLogger("Application started");
useLogger("Cache miss", undefined, "warn");
useLogger("Database timeout", { query: "SELECT 1" }, "error");
```

***

### useLogError()

```ts
useLogError(message, data?): void;
```

Defined in: [core/services/logger.service.ts:92](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/logger.service.ts#L92)

Logs a message at the "error" level.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `message` | `string` | The message to log. |
| `data?` | `unknown` | Optional error data to attach to the log. |

#### Returns

`void`

#### Example

```ts
useLogError("Database timeout", { query: "SELECT 1", duration: 5000 });
```

***

### useLogWarn()

```ts
useLogWarn(message, data?): void;
```

Defined in: [core/services/logger.service.ts:77](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/logger.service.ts#L77)

Logs a message at the "warn" level.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `message` | `string` | The message to log. |
| `data?` | `unknown` | Optional data to attach to the log. |

#### Returns

`void`

#### Example

```ts
useLogWarn("Cache miss", { key: "user:123" });
```

***

### useSetContext()

```ts
useSetContext(context): void;
```

Defined in: [core/services/logger.service.ts:32](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/logger.service.ts#L32)

Configura el prefijo de contexto. Vacío ("") lo elimina.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `context` | `string` |

#### Returns

`void`

***

### useTable()

```ts
useTable(data): void;
```

Defined in: [core/services/logger.service.ts:118](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/logger.service.ts#L118)

Displays tabular data in the console.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `unknown` | The data to display as a table. |

#### Returns

`void`

#### Example

```ts
useLoggerTable([{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]);
```

***

### getInstance()

```ts
static getInstance(): LoggerService;
```

Defined in: [core/services/logger.service.ts:22](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/logger.service.ts#L22)

Obtiene la instancia única del LoggerService (Singleton)

#### Returns

`LoggerService`

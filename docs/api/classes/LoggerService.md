[katanakit-js](../index.md) / LoggerService

# Class: LoggerService

Defined in: [core/services/logger.service.ts:4](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/logger.service.ts#L4)

LoggerService - Singleton para logging Aplica el patrón Singleton para garantizar una única instancia de logger.

## Methods

### clear()

```ts
clear(): void;
```

Defined in: [core/services/logger.service.ts:95](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/logger.service.ts#L95)

Clears the console.

#### Returns

`void`

#### Example

```ts
loggerClear();
```

***

### log()

```ts
log(
   message, 
   data?, 
   level?
): void;
```

Defined in: [core/services/logger.service.ts:49](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/logger.service.ts#L49)

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
import { logger } from "katanakit-js";

logger("Application started");
logger("Cache miss", undefined, "warn");
logger("Database timeout", { query: "SELECT 1" }, "error");
```

***

### logError()

```ts
logError(message, data?): void;
```

Defined in: [core/services/logger.service.ts:83](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/logger.service.ts#L83)

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
logError("Database timeout", { query: "SELECT 1", duration: 5000 });
```

***

### logWarn()

```ts
logWarn(message, data?): void;
```

Defined in: [core/services/logger.service.ts:68](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/logger.service.ts#L68)

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
logWarn("Cache miss", { key: "user:123" });
```

***

### setContext()

```ts
setContext(context): void;
```

Defined in: [core/services/logger.service.ts:23](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/logger.service.ts#L23)

Configura el prefijo de contexto. Vacío ("") lo elimina.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `context` | `string` |

#### Returns

`void`

***

### table()

```ts
table(data): void;
```

Defined in: [core/services/logger.service.ts:109](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/logger.service.ts#L109)

Displays tabular data in the console.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `unknown` | The data to display as a table. |

#### Returns

`void`

#### Example

```ts
loggerTable([{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]);
```

***

### getInstance()

```ts
static getInstance(): LoggerService;
```

Defined in: [core/services/logger.service.ts:15](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/logger.service.ts#L15)

Obtiene la instancia única del LoggerService (Singleton)

#### Returns

`LoggerService`

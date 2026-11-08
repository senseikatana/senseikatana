[katanakit-js](../index.md) / ErrorService

# Class: ErrorService

Defined in: [core/services/error.service.ts:32](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/error.service.ts#L32)

ErrorService — Singleton facade over error creation and normalization.

Applies the **Singleton** pattern (one shared instance via
[ErrorService.getInstance](#getinstance)) and the **Facade** pattern: each public
method hides the status-code message defaults and the raw-error mapping
behind one call. Everything is pure — no state, no I/O — so the instance is
safe to share across environments (Node, Bun, browser, SSR).

Every public method uses the `use*` prefix per `CONTRIBUTING.md`; the module
level `use*` functions below are thin wrappers kept for call-site ergonomics.

## Example

```ts
import { useErrorCustom } from "katanakit-js";

const error = useErrorCustom("User not found", 404);
// { message: "User not found", code: 404 }
```

## Methods

### useErrorCustom()

```ts
useErrorCustom(msg, code): {
  code: number;
  message: string;
};
```

Defined in: [core/services/error.service.ts:86](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/error.service.ts#L86)

Create a custom error object. Use with `useLogger` for consistent error logging.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `msg` | `string` | Error message |
| `code` | `number` | HTTP status code |

#### Returns

```ts
{
  code: number;
  message: string;
}
```

Serialized error with message and code

##### code

```ts
code: number;
```

##### message

```ts
message: string;
```

#### Example

```ts
import { useErrorCustom, useLogger } from "katanakit-js";

const error = useErrorCustom("User not found", 404);
useLogger(error.message, error, "error");
// { message: "User not found", code: 404 }
```

***

### useErrorNormalize()

```ts
useErrorNormalize(error, fallbackStatus?): {
  details?: unknown;
  message: string;
  status: number;
};
```

Defined in: [core/services/error.service.ts:109](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/error.service.ts#L109)

Normalizes any thrown value into the shared [ApiError](../type-aliases/ApiError.md) shape.

Reads `message`, numeric `status` (or `statusCode`, used by some SDKs) and
`details` when present; every other value becomes a generic error. This is
the canonical mapper for `useAttempt()` at service boundaries.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `error` | `unknown` | `undefined` | The caught value (`Error`, SDK error object, string, …). |
| `fallbackStatus` | `number` | `0` | Status used when the value has none (default: `0`). |

#### Returns

```ts
{
  details?: unknown;
  message: string;
  status: number;
}
```

A serializable `{ message, status, details? }` error.

##### details?

```ts
optional details?: unknown;
```

##### message

```ts
message: string;
```

##### status

```ts
status: number;
```

#### Example

```ts
import { useAttempt, useErrorNormalize } from "katanakit-js";

const result = await useAttempt(() => sdk.call(), useErrorNormalize);
if (!result.ok) console.error(result.error.status, result.error.message);
```

***

### useErrorSerialize()

```ts
useErrorSerialize(message?, code?): {
  code: number;
  message: string;
};
```

Defined in: [core/services/error.service.ts:63](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/error.service.ts#L63)

Serialize an error into a plain object.
Uses sensible defaults based on the status code when message is omitted.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `message` | `string` | `""` | Error message (falls back to status code default) |
| `code` | `number` | `400` | HTTP status code (default: 400) |

#### Returns

```ts
{
  code: number;
  message: string;
}
```

Serialized error with message and code

##### code

```ts
code: number;
```

##### message

```ts
message: string;
```

#### Example

```ts
const err = useErrorSerialize("User not found", 404);
// { message: "User not found", code: 404 }

const err2 = useErrorSerialize("", 500);
// { message: "Internal Server Error", code: 500 }
```

***

### getInstance()

```ts
static getInstance(): ErrorService;
```

Defined in: [core/services/error.service.ts:39](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/error.service.ts#L39)

Returns the shared instance (Singleton).

#### Returns

`ErrorService`

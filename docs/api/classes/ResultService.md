[katanakit-js](../index.md) / ResultService

# Class: ResultService

Defined in: [core/services/result.service.ts:28](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/result.service.ts#L28)

ResultService — Singleton facade for Safe Result creation at service
boundaries.

Applies the **Singleton** pattern (one shared instance via
[ResultService.getInstance](#getinstance)) and the **Facade** pattern: each public
method hides a `try/catch` behind one call that always resolves to the
`{ data, error, ok }` discriminated union from [SafeResult](../type-aliases/SafeResult.md). Nothing is
thrown and both error branches keep their exact shapes (`error.status = 0`
for parse failures), so consumers can narrow on `ok` without extra guards.

Every public method uses the `use*` prefix per `CONTRIBUTING.md`; the module
level `use*` functions below are thin wrappers kept for call-site ergonomics.

## Example

```ts
import { useAttempt } from "katanakit-js";

const result = await useAttempt(() => sdk.insert("posts", row));
if (result.ok) console.log(result.data);
else console.error(result.error.message);
```

## Methods

### useAttempt()

```ts
useAttempt<T>(operation, mapError?): Promise<SafeResult<T>>;
```

Defined in: [core/services/result.service.ts:63](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/result.service.ts#L63)

Runs an operation (sync or async) and captures any throw as a Safe Result.

The canonical replacement for ad-hoc `try/catch` at service boundaries: the
mapper defaults to [useErrorNormalize](../functions/useErrorNormalize.md), so SDK errors, `Error`
instances and plain strings all come back normalized.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | Success value type. |

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `operation` | () => `T` \| `Promise`\<`T`\> | `undefined` | The operation to run. |
| `mapError` | (`error`) => \{ `details?`: `unknown`; `message`: `string`; `status`: `number`; \} | `useErrorNormalize` | Optional error mapper (default: `useErrorNormalize`). |

#### Returns

`Promise`\<[`SafeResult`](../type-aliases/SafeResult.md)\<`T`\>\>

`{ data, error, ok }` — never throws.

#### Example

```ts
import { useAttempt } from "katanakit-js";

const result = await useAttempt(() => sdk.insert("posts", row));
if (result.ok) console.log(result.data);
else console.error(result.error.message);
```

***

### useTryJsonParse()

```ts
useTryJsonParse<T>(text): SafeResult<T>;
```

Defined in: [core/services/result.service.ts:90](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/result.service.ts#L90)

Parses JSON without throwing; failures come back as a Safe Result.

Consumers keep their own fallback policy (raw string, `null`, retry, …) by
checking `ok` instead of nesting `try/catch`.

#### Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `T` | `unknown` | Expected parsed shape. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `text` | `string` | Raw JSON text. |

#### Returns

[`SafeResult`](../type-aliases/SafeResult.md)\<`T`\>

`{ data, error, ok }` with `error.status = 0` on parse failure.

#### Example

```ts
const parsed = useTryJsonParse<{ id: number }>(raw);
return parsed.ok ? parsed.data : raw;
```

***

### getInstance()

```ts
static getInstance(): ResultService;
```

Defined in: [core/services/result.service.ts:35](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/result.service.ts#L35)

Returns the shared instance (Singleton).

#### Returns

`ResultService`

[katanakit-js](../index.md) / ValidationService

# Class: ValidationService

Defined in: [core/services/validation.service.ts:13](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/validation.service.ts#L13)

ValidationService - Singleton para validaciones.

Aplica el patrón Singleton: una única instancia que centraliza la
validación de datos desconocidos (respuestas de API, configs, input de
usuario) contra esquemas Zod devolviendo Safe Results en vez de lanzar
excepciones. Puro y sin I/O, seguro para SSR.

## Methods

### validate()

```ts
validate<T>(schema, data): FetchResult<T>;
```

Defined in: [core/services/validation.service.ts:55](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/validation.service.ts#L55)

Validates unknown data (API responses, configs, user input) against a
Zod schema and returns a Safe Result instead of throwing.
Framework-agnostic and pure: no I/O, SSR-safe.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | The validated output type (`z.infer` of the schema). |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `schema` | `ZodType`\<`T`\> | Any Zod schema. |
| `data` | `unknown` | Unknown input to validate. |

#### Returns

[`FetchResult`](../type-aliases/FetchResult.md)\<`T`\>

`FetchResult<T>` with typed data or a `Validation Error`.

#### Example

```ts
import { SmartVideoOptionsSchema } from "katanakit-js/schemas";

const result = onValidate(SmartVideoOptionsSchema, JSON.parse(raw));
if (result.ok) onBuildVideoEmbed(result.data);
```

***

### getInstance()

```ts
static getInstance(): ValidationService;
```

Defined in: [core/services/validation.service.ts:30](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/validation.service.ts#L30)

Obtiene la instancia única del ValidationService (Singleton).

#### Returns

`ValidationService`

La instancia única de ValidationService.

#### Example

```ts
const validator = ValidationService.getInstance();
validator.validate(SmartVideoOptionsSchema, raw);
```

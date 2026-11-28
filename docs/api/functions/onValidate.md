[katanakit-js](../index.md) / onValidate

# Function: onValidate()

```ts
function onValidate<T>(schema, data): FetchResult<T>;
```

Defined in: [core/services/validation.service.ts:96](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/validation.service.ts#L96)

Validates unknown data against a Zod schema and returns a Safe Result.
Wrapper sobre [ValidationService](../classes/ValidationService.md) (backward compatibility).

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | The validated output type (`z.infer` of the schema). |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `schema` | `ZodType`\<`T`\> | Any Zod schema. |
| `data` | `unknown` | Unknown input to validate. |

## Returns

[`FetchResult`](../type-aliases/FetchResult.md)\<`T`\>

`FetchResult<T>` with typed data or a `Validation Error`.

## Example

```ts
import { SmartVideoOptionsSchema } from "katanakit-js/schemas";

const result = onValidate(SmartVideoOptionsSchema, JSON.parse(raw));
if (result.ok) onBuildVideoEmbed(result.data);
```

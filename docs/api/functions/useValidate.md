[katanakit-js](../index.md) / useValidate

# Function: useValidate()

```ts
function useValidate<T>(schema, data): FetchResult<T>;
```

Defined in: [core/services/validation.service.ts:98](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/validation.service.ts#L98)

Validates unknown data against a Zod schema and returns a Safe Result.
Wrapper sobre [ValidationService](../classes/ValidationService.md) (backward compatibility).

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The validated output type (`z.infer` of the schema). |

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

const result = useValidate(SmartVideoOptionsSchema, JSON.parse(raw));
if (result.ok) useBuildVideoEmbed(result.data);
```

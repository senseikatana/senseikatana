[katanakit-js](../index.md) / ValidationSchema

# Interface: ValidationSchema\<T\>

Defined in: [types/core/validation.ts:20](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/validation.ts#L20)

Schema-agnostic contract. Accepts Zod (`safeParse`), Valibot
(`safeParse`), Standard Schema (`~standard.validate`), Yup
(`validateSync`) or any object exposing one of those members.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | `unknown` |

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="standard"></a> `~standard?` | \{ `validate`: (`data`) => \| \{ `issues?`: \{ `message`: `string`; `path`: (`string` \| `number`)[]; \}[]; \} \| `Promise`\<\{ `issues?`: \{ `message`: `string`; `path`: (... \| ...)[]; \}[]; \}\>; \} | [types/core/validation.ts:22](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/validation.ts#L22) |
| `~standard.validate` | (`data`) => \| \{ `issues?`: \{ `message`: `string`; `path`: (`string` \| `number`)[]; \}[]; \} \| `Promise`\<\{ `issues?`: \{ `message`: `string`; `path`: (... \| ...)[]; \}[]; \}\> | [types/core/validation.ts:23](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/validation.ts#L23) |
| <a id="safeparse"></a> `safeParse?` | (`data`) => [`ValidationParseResult`](../type-aliases/ValidationParseResult.md)\<`T`\> | [types/core/validation.ts:21](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/validation.ts#L21) |
| <a id="validate"></a> `validate?` | (`data`) => `unknown` | [types/core/validation.ts:28](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/validation.ts#L28) |
| <a id="validatesync"></a> `validateSync?` | (`data`) => `unknown` | [types/core/validation.ts:27](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/validation.ts#L27) |

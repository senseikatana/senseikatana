[katanakit-js](../index.md) / GrantAwareOptions

# Interface: GrantAwareOptions

Defined in: [core/services/grant.service.ts:39](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/grant.service.ts#L39)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="access"></a> `access?` | [`AccessService`](../classes/AccessService.md) | Override the registry (tests, isolated instances). | [core/services/grant.service.ts:46](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/grant.service.ts#L46) |
| <a id="capability"></a> `capability` | `string` | - | [core/services/grant.service.ts:42](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/grant.service.ts#L42) |
| <a id="now"></a> `now?` | `Date` | Injected clock, so expiry is testable. | [core/services/grant.service.ts:48](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/grant.service.ts#L48) |
| <a id="resource"></a> `resource` | \{ `id`: `string` \| `number`; `type`: `string`; \} | - | [core/services/grant.service.ts:41](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/grant.service.ts#L41) |
| `resource.id` | `string` \| `number` | - | [schemas/grant.schema.ts:15](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/grant.schema.ts#L15) |
| `resource.type` | `string` | - | [schemas/grant.schema.ts:14](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/grant.schema.ts#L14) |
| <a id="subject"></a> `subject` | \{ \[`key`: `string`\]: `unknown`; `id`: `string` \| `number`; `roles`: `string`[]; \} | - | [core/services/grant.service.ts:40](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/grant.service.ts#L40) |
| `subject.id` | `string` \| `number` | - | [schemas/access.schema.ts:105](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/access.schema.ts#L105) |
| `subject.roles` | `string`[] | - | [schemas/access.schema.ts:106](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/access.schema.ts#L106) |
| <a id="usegrants"></a> `useGrants?` | [`GrantResolver`](../type-aliases/GrantResolver.md) | Omit to deny every grant-scoped check. Global roles still resolve. | [core/services/grant.service.ts:44](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/grant.service.ts#L44) |

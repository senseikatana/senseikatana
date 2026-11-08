[katanakit-js](../index.md) / ResourceAccessDecision

# Interface: ResourceAccessDecision

Defined in: [core/services/grant.service.ts:30](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/grant.service.ts#L30)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="allowed"></a> `allowed` | `boolean` | Whether the capability is permitted on this resource. | [core/services/grant.service.ts:32](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/grant.service.ts#L32) |
| <a id="source"></a> `source` | [`AccessSource`](../type-aliases/AccessSource.md) | Whether it came from a global role, a resource grant, or nowhere. | [core/services/grant.service.ts:34](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/grant.service.ts#L34) |
| <a id="via"></a> `via?` | `string` | The role that carried it — the granted one when `source` is `"grant"`. | [core/services/grant.service.ts:36](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/grant.service.ts#L36) |

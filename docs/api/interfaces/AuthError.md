[katanakit-js](../index.md) / AuthError

# Interface: AuthError

Defined in: [core/services/auth.service.ts:16](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/auth.service.ts#L16)

Why a provider could not answer.

`status` is the provider's own answer when it has one — InsForge reports 401
for a rejected token, a transport reports 503 when it is down — so a caller
can tell "this credential is bad" from "the backend is unreachable" without
parsing a message.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="details"></a> `details?` | `unknown` | [core/services/auth.service.ts:19](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/auth.service.ts#L19) |
| <a id="message"></a> `message` | `string` | [core/services/auth.service.ts:17](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/auth.service.ts#L17) |
| <a id="status"></a> `status?` | `number` | [core/services/auth.service.ts:18](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/auth.service.ts#L18) |

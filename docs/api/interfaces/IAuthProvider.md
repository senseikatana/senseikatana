[katanakit-js](../index.md) / IAuthProvider

# Interface: IAuthProvider

Defined in: [core/services/auth.service.ts:65](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/auth.service.ts#L65)

An identity provider the kit can ask *"who is this?"*.

This is the whole authentication surface. The kit does not re-expose the
provider's API — signing in, refreshing tokens and revoking sessions belong
to the provider's own SDK, which already does them correctly for that
provider. What the kit needs is a single normalised answer so that
authorization never has to know which provider produced it.

The contract has exactly two answers. A visitor is `{ ok: true, data: null }`
— not an error, because "nobody" is a legitimate answer. Only a real failure
(misconfigured provider, unreachable backend, malformed response) is
`ok: false`. Collapsing those two is how a broken provider starts reading as
"nobody is logged in" and silently opens a public route.

Implement it for any IdP: the two shipped are Better Auth and InsForge.

## Example

**A deployment's own provider**

```ts
const nationalId: IAuthProvider = {
  provider: "dni",
  methods: ["password"],
  async useResolve(input) {
    const token = bearer(input);
    if (!token) return { data: null, error: null, ok: true };
    const person = await registry.lookup(token);
    return person
      ? { data: { subject: person.id, method: "password", provider: "dni" }, error: null, ok: true }
      : { data: null, error: null, ok: true };
  },
};
```

## Properties

| Property | Modifier | Type | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="methods"></a> `methods?` | `readonly` | readonly `string`[] | Methods this deployment enabled — `"password"`, `"oauth:google"`, `"otp"`, `"passkey"`. Informational: it describes the deployment's configuration, and never feeds into authorization. | [core/services/auth.service.ts:73](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/auth.service.ts#L73) |
| <a id="provider"></a> `provider` | `readonly` | `string` | Stable id used to select this provider, e.g. `"better-auth"`. | [core/services/auth.service.ts:67](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/auth.service.ts#L67) |

## Methods

### useResolve()

```ts
useResolve(input): Promise<AuthResult<
  | {
  claims?: Record<string, unknown>;
  email?: string;
  emailVerified?: boolean;
  method: string;
  provider: string;
  subject: string;
}
| null>>;
```

Defined in: [core/services/auth.service.ts:75](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/auth.service.ts#L75)

Resolves the caller. Returns `null` data for an anonymous request.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | [`AuthRequestLike`](../type-aliases/AuthRequestLike.md) |

#### Returns

`Promise`\<[`AuthResult`](../type-aliases/AuthResult.md)\<
  \| \{
  `claims?`: `Record`\<`string`, `unknown`\>;
  `email?`: `string`;
  `emailVerified?`: `boolean`;
  `method`: `string`;
  `provider`: `string`;
  `subject`: `string`;
\}
  \| `null`\>\>

[katanakit-js](../index.md) / AuthService

# Class: AuthService

Defined in: [core/services/auth.service.ts:91](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/auth.service.ts#L91)

Holds the providers a deployment has configured and routes a request to one.

A registry rather than a single global provider because "which one" is
configuration: a municipality may resolve a national identity number while
a SaaS resolves an OAuth session, and both ship as the same kit. Nothing
here reaches the network — providers are injected, so the core stays pure
and testable with a stub.

## Methods

### useHas()

```ts
useHas(provider): boolean;
```

Defined in: [core/services/auth.service.ts:117](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/auth.service.ts#L117)

Whether a provider id is registered.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `provider` | `string` |

#### Returns

`boolean`

***

### useProviders()

```ts
useProviders(): string[];
```

Defined in: [core/services/auth.service.ts:122](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/auth.service.ts#L122)

Registered provider ids, in registration order.

#### Returns

`string`[]

***

### useRegister()

```ts
useRegister(provider): void;
```

Defined in: [core/services/auth.service.ts:112](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/auth.service.ts#L112)

Registers a provider, replacing any previous one with the same id.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `provider` | [`IAuthProvider`](../interfaces/IAuthProvider.md) |

#### Returns

`void`

***

### useResolve()

```ts
useResolve(provider, input): Promise<AuthResult<
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

Defined in: [core/services/auth.service.ts:138](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/auth.service.ts#L138)

Resolves the caller through the named provider.

An unknown provider id is a configuration failure, not an anonymous
visitor — it returns `ok: false` so a typo cannot quietly turn a guarded
route into a public one.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `provider` | `string` |
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

***

### useUnregister()

```ts
useUnregister(provider): boolean;
```

Defined in: [core/services/auth.service.ts:127](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/auth.service.ts#L127)

Removes a provider. Returns whether it was there.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `provider` | `string` |

#### Returns

`boolean`

***

### create()

```ts
static create(): AuthService;
```

Defined in: [core/services/auth.service.ts:107](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/auth.service.ts#L107)

A non-singleton instance, for tests or for isolating two deployments.

#### Returns

`AuthService`

***

### getInstance()

```ts
static getInstance(): AuthService;
```

Defined in: [core/services/auth.service.ts:101](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/auth.service.ts#L101)

The shared instance.

#### Returns

`AuthService`

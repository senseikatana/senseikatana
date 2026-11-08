[katanakit-js](../index.md) / DirectoryService

# Class: DirectoryService

Defined in: [core/services/directory.service.ts:211](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/directory.service.ts#L211)

User management over any storage, with the lockout guards built in.

Pure orchestration: every method either returns a `DirectoryResult` or hands
the decision back to the repository. No exceptions for expected refusals —
"you may not do that" is an answer, not a crash, and a caller should not have
to distinguish the two in a `catch`.

**Deliberately not here:** deleting a provider account, revoking a live
session, forcing a password change. Those belong to the identity provider
and are the caller's to invoke — a directory row disappearing must not be the
only thing that happened.

## Example

```ts
const directory = new DirectoryService({ repository });

const suspended = await directory.useSuspend(actor, 42, "left the company");
if (!suspended.ok && suspended.error.code === "last_owner") {
  // render the "promote someone else first" message
}
```

## Constructors

### Constructor

```ts
new DirectoryService(__namedParameters): DirectoryService;
```

Defined in: [core/services/directory.service.ts:214](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/directory.service.ts#L214)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `__namedParameters` | [`DirectoryServiceOptions`](../interfaces/DirectoryServiceOptions.md) |

#### Returns

`DirectoryService`

## Methods

### useAddRole()

```ts
useAddRole(
   actor, 
   id, 
   role
): Promise<DirectoryResult<{
  displayName?: string;
  email?: string;
  id: string | number;
  metadata?: Record<string, unknown>;
  principalSubject?: string;
  roles: string[];
  scope?: string;
  status: "active" | "pending" | "suspended" | "deactivated";
}>>;
```

Defined in: [core/services/directory.service.ts:282](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/directory.service.ts#L282)

Grants a role. Refuses when the actor does not already hold it.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `actor` | [`DirectoryActor`](../interfaces/DirectoryActor.md) |
| `id` | `string` \| `number` |
| `role` | `string` |

#### Returns

`Promise`\<[`DirectoryResult`](../type-aliases/DirectoryResult.md)\<\{
  `displayName?`: `string`;
  `email?`: `string`;
  `id`: `string` \| `number`;
  `metadata?`: `Record`\<`string`, `unknown`\>;
  `principalSubject?`: `string`;
  `roles`: `string`[];
  `scope?`: `string`;
  `status`: `"active"` \| `"pending"` \| `"suspended"` \| `"deactivated"`;
\}\>\>

***

### useCreate()

```ts
useCreate(actor, user): Promise<DirectoryResult<{
  displayName?: string;
  email?: string;
  id: string | number;
  metadata?: Record<string, unknown>;
  principalSubject?: string;
  roles: string[];
  scope?: string;
  status: "active" | "pending" | "suspended" | "deactivated";
}>>;
```

Defined in: [core/services/directory.service.ts:239](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/directory.service.ts#L239)

Registers a person.

The actor is required even though creating is usually permissive: it is
what lets a deployment decide later that creation is itself a capability,
without changing this signature.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `actor` | [`DirectoryActor`](../interfaces/DirectoryActor.md) |
| `user` | `Omit`\<[`DirectoryUser`](../type-aliases/DirectoryUser.md), `"id"`\> |

#### Returns

`Promise`\<[`DirectoryResult`](../type-aliases/DirectoryResult.md)\<\{
  `displayName?`: `string`;
  `email?`: `string`;
  `id`: `string` \| `number`;
  `metadata?`: `Record`\<`string`, `unknown`\>;
  `principalSubject?`: `string`;
  `roles`: `string`[];
  `scope?`: `string`;
  `status`: `"active"` \| `"pending"` \| `"suspended"` \| `"deactivated"`;
\}\>\>

***

### useDelete()

```ts
useDelete(actor, id): Promise<DirectoryResult<true>>;
```

Defined in: [core/services/directory.service.ts:397](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/directory.service.ts#L397)

Removes the record permanently.

Separate from [useSuspend](#usesuspend) on purpose — and it does not touch the
provider account, so a caller who needs real revocation must do that too.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `actor` | [`DirectoryActor`](../interfaces/DirectoryActor.md) |
| `id` | `string` \| `number` |

#### Returns

`Promise`\<[`DirectoryResult`](../type-aliases/DirectoryResult.md)\<`true`\>\>

***

### useGet()

```ts
useGet(id): Promise<DirectoryResult<{
  displayName?: string;
  email?: string;
  id: string | number;
  metadata?: Record<string, unknown>;
  principalSubject?: string;
  roles: string[];
  scope?: string;
  status: "active" | "pending" | "suspended" | "deactivated";
}>>;
```

Defined in: [core/services/directory.service.ts:228](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/directory.service.ts#L228)

Fetches one user.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `string` \| `number` |

#### Returns

`Promise`\<[`DirectoryResult`](../type-aliases/DirectoryResult.md)\<\{
  `displayName?`: `string`;
  `email?`: `string`;
  `id`: `string` \| `number`;
  `metadata?`: `Record`\<`string`, `unknown`\>;
  `principalSubject?`: `string`;
  `roles`: `string`[];
  `scope?`: `string`;
  `status`: `"active"` \| `"pending"` \| `"suspended"` \| `"deactivated"`;
\}\>\>

***

### useList()

```ts
useList(query?): Promise<DirectoryPageResult>;
```

Defined in: [core/services/directory.service.ts:219](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/directory.service.ts#L219)

Lists users, filtered and paginated by the repository.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `query` | `Partial`\<[`DirectoryQuery`](../type-aliases/DirectoryQuery.md)\> |

#### Returns

`Promise`\<[`DirectoryPageResult`](../type-aliases/DirectoryPageResult.md)\>

***

### useReactivate()

```ts
useReactivate(actor, id): Promise<DirectoryResult<{
  displayName?: string;
  email?: string;
  id: string | number;
  metadata?: Record<string, unknown>;
  principalSubject?: string;
  roles: string[];
  scope?: string;
  status: "active" | "pending" | "suspended" | "deactivated";
}>>;
```

Defined in: [core/services/directory.service.ts:372](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/directory.service.ts#L372)

Returns a suspended account to service.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `actor` | [`DirectoryActor`](../interfaces/DirectoryActor.md) |
| `id` | `string` \| `number` |

#### Returns

`Promise`\<[`DirectoryResult`](../type-aliases/DirectoryResult.md)\<\{
  `displayName?`: `string`;
  `email?`: `string`;
  `id`: `string` \| `number`;
  `metadata?`: `Record`\<`string`, `unknown`\>;
  `principalSubject?`: `string`;
  `roles`: `string`[];
  `scope?`: `string`;
  `status`: `"active"` \| `"pending"` \| `"suspended"` \| `"deactivated"`;
\}\>\>

***

### useRemoveRole()

```ts
useRemoveRole(
   actor, 
   id, 
   role
): Promise<DirectoryResult<{
  displayName?: string;
  email?: string;
  id: string | number;
  metadata?: Record<string, unknown>;
  principalSubject?: string;
  roles: string[];
  scope?: string;
  status: "active" | "pending" | "suspended" | "deactivated";
}>>;
```

Defined in: [core/services/directory.service.ts:312](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/directory.service.ts#L312)

Revokes a role, keeping the person active.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `actor` | [`DirectoryActor`](../interfaces/DirectoryActor.md) |
| `id` | `string` \| `number` |
| `role` | `string` |

#### Returns

`Promise`\<[`DirectoryResult`](../type-aliases/DirectoryResult.md)\<\{
  `displayName?`: `string`;
  `email?`: `string`;
  `id`: `string` \| `number`;
  `metadata?`: `Record`\<`string`, `unknown`\>;
  `principalSubject?`: `string`;
  `roles`: `string`[];
  `scope?`: `string`;
  `status`: `"active"` \| `"pending"` \| `"suspended"` \| `"deactivated"`;
\}\>\>

***

### useSuspend()

```ts
useSuspend(
   actor, 
   id, 
   reason?
): Promise<DirectoryResult<{
  displayName?: string;
  email?: string;
  id: string | number;
  metadata?: Record<string, unknown>;
  principalSubject?: string;
  roles: string[];
  scope?: string;
  status: "active" | "pending" | "suspended" | "deactivated";
}>>;
```

Defined in: [core/services/directory.service.ts:340](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/directory.service.ts#L340)

Suspends access while keeping the record and its audit trail.

This is the operation a real offboarding uses, and it is **not**
`useDelete`. Removing the row loses the evidence that the account existed;
leaving the account merely "inactive" in a provider that has no such state
means someone can still sign in. Suspension is the reversible, auditable
middle ground, and [useDelete](#usedelete) is reserved for a genuine correction.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `actor` | [`DirectoryActor`](../interfaces/DirectoryActor.md) |
| `id` | `string` \| `number` |
| `reason?` | `string` |

#### Returns

`Promise`\<[`DirectoryResult`](../type-aliases/DirectoryResult.md)\<\{
  `displayName?`: `string`;
  `email?`: `string`;
  `id`: `string` \| `number`;
  `metadata?`: `Record`\<`string`, `unknown`\>;
  `principalSubject?`: `string`;
  `roles`: `string`[];
  `scope?`: `string`;
  `status`: `"active"` \| `"pending"` \| `"suspended"` \| `"deactivated"`;
\}\>\>

***

### useUpdate()

```ts
useUpdate(
   actor, 
   id, 
   patch
): Promise<DirectoryResult<{
  displayName?: string;
  email?: string;
  id: string | number;
  metadata?: Record<string, unknown>;
  principalSubject?: string;
  roles: string[];
  scope?: string;
  status: "active" | "pending" | "suspended" | "deactivated";
}>>;
```

Defined in: [core/services/directory.service.ts:258](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/directory.service.ts#L258)

Patches a user's fields.

Roles go through the demotion guards even here, because an `update` that
silently accepts `{ roles: [] }` is a way around `useRemoveRole` entirely.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `actor` | [`DirectoryActor`](../interfaces/DirectoryActor.md) |
| `id` | `string` \| `number` |
| `patch` | `Partial`\<`Omit`\<[`DirectoryUser`](../type-aliases/DirectoryUser.md), `"id"`\>\> |

#### Returns

`Promise`\<[`DirectoryResult`](../type-aliases/DirectoryResult.md)\<\{
  `displayName?`: `string`;
  `email?`: `string`;
  `id`: `string` \| `number`;
  `metadata?`: `Record`\<`string`, `unknown`\>;
  `principalSubject?`: `string`;
  `roles`: `string`[];
  `scope?`: `string`;
  `status`: `"active"` \| `"pending"` \| `"suspended"` \| `"deactivated"`;
\}\>\>

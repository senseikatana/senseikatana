[katanakit-js](../index.md) / DirectoryRepository

# Interface: DirectoryRepository

Defined in: [core/services/directory.service.ts:29](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/directory.service.ts#L29)

Where user records actually live.

Injected, never implemented here. A role ladder that cannot decide its own
questions is fine; a role ladder that decides where the rows go is not — that
is what would tie the kit to one database and make "the core does no I/O" a
lie.

Everything here is `Promise` because nothing here should be: an in-memory
adapter for tests returns already-resolved promises, and a caller is never
tempted to write sync code that only works against the fake.

## Methods

### countByRole()

```ts
countByRole(role): Promise<number>;
```

Defined in: [core/services/directory.service.ts:48](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/directory.service.ts#L48)

How many active users hold each role.

Called before any demotion so the "last owner" check cannot be raced by a
second concurrent demotion. A repository that cannot answer this cheaply
should cache it — the count is the only thing standing between a routine
role change and an unadministrable system.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `role` | `string` |

#### Returns

`Promise`\<`number`\>

***

### create()

```ts
create(user): Promise<DirectoryResult<{
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

Defined in: [core/services/directory.service.ts:33](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/directory.service.ts#L33)

Persists a new person. Fails with `already_active` on a duplicate.

#### Parameters

| Parameter | Type |
| ------ | ------ |
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

### delete()

```ts
delete(id): Promise<DirectoryResult<true>>;
```

Defined in: [core/services/directory.service.ts:39](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/directory.service.ts#L39)

Row removal. Soft-delete belongs in [update](#update), not here.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `string` \| `number` |

#### Returns

`Promise`\<[`DirectoryResult`](../type-aliases/DirectoryResult.md)\<`true`\>\>

***

### get()

```ts
get(id): Promise<DirectoryResult<{
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

Defined in: [core/services/directory.service.ts:31](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/directory.service.ts#L31)

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

### list()

```ts
list(query): Promise<DirectoryPageResult>;
```

Defined in: [core/services/directory.service.ts:30](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/directory.service.ts#L30)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `query` | \{ `cursor?`: `string`; `limit`: `number`; `role?`: `string`; `scope?`: `string`; `search?`: `string`; `status?`: `"active"` \| `"pending"` \| `"suspended"` \| `"deactivated"`; \} |
| `query.cursor?` | `string` |
| `query.limit?` | `number` |
| `query.role?` | `string` |
| `query.scope?` | `string` |
| `query.search?` | `string` |
| `query.status?` | `"active"` \| `"pending"` \| `"suspended"` \| `"deactivated"` |

#### Returns

`Promise`\<[`DirectoryPageResult`](../type-aliases/DirectoryPageResult.md)\>

***

### update()

```ts
update(id, patch): Promise<DirectoryResult<{
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

Defined in: [core/services/directory.service.ts:34](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/directory.service.ts#L34)

#### Parameters

| Parameter | Type |
| ------ | ------ |
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

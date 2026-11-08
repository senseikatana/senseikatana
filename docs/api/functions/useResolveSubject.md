[katanakit-js](../index.md) / useResolveSubject

# Function: useResolveSubject()

```ts
function useResolveSubject(
   provider, 
   input, 
   useRoles, 
   auth?
): Promise<AuthResult<
  | {
[key: string]: unknown;
  id: string | number;
  roles: string[];
}
| null>>;
```

Defined in: [core/services/auth.service.ts:181](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/auth.service.ts#L181)

Turns an authenticated principal into an access subject — the single point
where authentication hands over to authorization.

The role lookup is injected because it *is* the deployment's: reading roles
means touching storage, which the core must not do. Returning `null` roles
is legitimate — an authenticated user with no role yet is a normal state
right after a first login, and a well-behaved route answers `403` for them
rather than pretending they are anonymous.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `provider` | `string` |
| `input` | [`AuthRequestLike`](../type-aliases/AuthRequestLike.md) |
| `useRoles` | (`principal`) => `string`[] \| `Promise`\<`string`[]\> |
| `auth?` | [`AuthService`](../classes/AuthService.md) |

## Returns

`Promise`\<[`AuthResult`](../type-aliases/AuthResult.md)\<
  \| \{
\[`key`: `string`\]: `unknown`;
  `id`: `string` \| `number`;
  `roles`: `string`[];
\}
  \| `null`\>\>

## Example

```ts
const subject = await useResolveSubject(
  "better-auth",
  request,
  (principal) => directory.rolesFor(principal.subject),
);
if (!subject.ok) return response.status(500).end();
if (!subject.data) return response.status(401).end();
// subject.data is now an AccessSubject
```

[katanakit-js](../index.md) / useGrantAwareCan

# Function: useGrantAwareCan()

```ts
function useGrantAwareCan(options): ResourceAccessDecision;
```

Defined in: [core/services/grant.service.ts:84](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/grant.service.ts#L84)

Resolves a capability against a subject **and** a resource.

Two independent sources, checked in order:

1. the subject's global roles — a department head may sign any payroll;
2. a grant on this exact resource — an employee sees only their own file.

Neither subsumes the other, which is why this is not `useCan` with extra
arguments. A global role answers *"what class of thing may this person ever
do"*; a grant answers *"may they do it to this one"*. A deployment needs
both the moment anyone shares a document with one person and nothing with
everybody else.

An expired grant is treated as absent, so revoking a contractor is deleting
one row — not auditing every query path that might have cached the role.

Pure: no storage access, no clock read, no globals.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `options` | [`GrantAwareOptions`](../interfaces/GrantAwareOptions.md) |

## Returns

[`ResourceAccessDecision`](../interfaces/ResourceAccessDecision.md)

## Example

```ts
useGrantAwareCan({
  subject: sessionSubject,
  resource: { type: "expediente", id: 42 },
  capability: "expediente:read",
  useGrants: ({ subject, resource }) => listShares(subject.id, resource),
});
```

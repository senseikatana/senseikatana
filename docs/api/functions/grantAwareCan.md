[katanakit-js](../index.md) / grantAwareCan

# Function: grantAwareCan()

```ts
function grantAwareCan(options): ResourceAccessDecision;
```

Defined in: [core/services/grant.service.ts:84](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/grant.service.ts#L84)

Resolves a capability against a subject **and** a resource.

Two independent sources, checked in order:

1. the subject's global roles — a department head may sign any payroll;
2. a grant on this exact resource — an employee sees only their own file.

Neither subsumes the other, which is why this is not `onCan` with extra
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
grantAwareCan({
  subject: sessionSubject,
  resource: { type: "expediente", id: 42 },
  capability: "expediente:read",
  onGrants: ({ subject, resource }) => listShares(subject.id, resource),
});
```

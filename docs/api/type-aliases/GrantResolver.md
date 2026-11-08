[katanakit-js](../index.md) / GrantResolver

# Type Alias: GrantResolver

```ts
type GrantResolver = (input) => readonly Grant[];
```

Defined in: [core/services/grant.service.ts:22](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/grant.service.ts#L22)

Supplies the roles a subject holds over one resource.

Injected, never implemented here. The core must not know whether grants live
in Postgres, in a `shares` table behind an RLS policy, or in a test fixture —
and it must not know that a *global* role ladder and a *per-resource* ACL
need different storage with different query shapes.

Return every grant you can see for this pair, expired or not. Expiry is
evaluated by [useGrantAwareCan](../functions/useGrantAwareCan.md) so the rule lives in one place instead
of in every caller that remembered to write it.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | \{ `resource`: [`AccessResource`](AccessResource.md); `subject`: [`AccessSubject`](AccessSubject.md); \} |
| `input.resource` | [`AccessResource`](AccessResource.md) |
| `input.subject` | [`AccessSubject`](AccessSubject.md) |

## Returns

readonly [`Grant`](Grant.md)[]

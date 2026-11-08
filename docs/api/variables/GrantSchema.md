[katanakit-js](../index.md) / GrantSchema

# Variable: GrantSchema

```ts
const GrantSchema: ZodObject<{
  expiresAt: ZodOptional<ZodString>;
  grantedAt: ZodOptional<ZodString>;
  resource: ZodObject<{
     id: ZodUnion<readonly [ZodString, ZodNumber]>;
     type: ZodString;
  }, $strip>;
  role: ZodString;
  subjectId: ZodUnion<readonly [ZodString, ZodNumber]>;
}, $strip>;
```

Defined in: [schemas/grant.schema.ts:30](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/grant.schema.ts#L30)

A role held over one specific resource — the "share with restricted access"
that a content-management role ladder cannot express.

It is a **role**, not a boolean, on purpose. Reusing the same registry as
global roles means `viewer` means whatever the deployment registered it to
mean, and there is one vocabulary to learn instead of two. The only
difference from a global role is the `resource`, which is what scopes it.

`expiresAt` exists for temporary shares (a contractor, a substitute). A
grant that never expires is a grant nobody remembers revoking.

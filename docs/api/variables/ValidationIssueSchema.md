[katanakit-js](../index.md) / ValidationIssueSchema

# Variable: ValidationIssueSchema

```ts
const ValidationIssueSchema: ZodObject<{
  message: ZodString;
  path: ZodArray<ZodUnion<readonly [ZodString, ZodNumber]>>;
}, $strip>;
```

Defined in: [schemas/core.schema.ts:214](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/core.schema.ts#L214)

Minimal issue shape (`error.issues` entries).

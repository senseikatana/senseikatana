[katanakit-js](../index.md) / ValidationIssueSchema

# Variable: ValidationIssueSchema

```ts
const ValidationIssueSchema: ZodObject<{
  message: ZodString;
  path: ZodArray<ZodUnion<readonly [ZodString, ZodNumber]>>;
}, $strip>;
```

Defined in: [schemas/core.schema.ts:214](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/core.schema.ts#L214)

Minimal issue shape (`error.issues` entries).

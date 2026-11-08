[katanakit-js](../index.md) / ValidationIssueSchema

# Variable: ValidationIssueSchema

```ts
const ValidationIssueSchema: ZodObject<{
  message: ZodString;
  path: ZodArray<ZodUnion<readonly [ZodString, ZodNumber]>>;
}, $strip>;
```

Defined in: [schemas/core.schema.ts:214](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/core.schema.ts#L214)

Minimal issue shape (`error.issues` entries).

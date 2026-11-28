[katanakit-js](../index.md) / ValidationIssueSchema

# Variable: ValidationIssueSchema

```ts
const ValidationIssueSchema: ZodObject<{
  message: ZodString;
  path: ZodArray<ZodUnion<readonly [ZodString, ZodNumber]>>;
}, $strip>;
```

Defined in: [schemas/core.schema.ts:205](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/core.schema.ts#L205)

Minimal issue shape (`error.issues` entries).

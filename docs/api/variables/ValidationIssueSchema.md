[katanakit-js](../index.md) / ValidationIssueSchema

# Variable: ValidationIssueSchema

```ts
const ValidationIssueSchema: ZodObject<{
  message: ZodString;
  path: ZodArray<ZodUnion<readonly [ZodString, ZodNumber]>>;
}, $strip>;
```

Defined in: [schemas/core.schema.ts:214](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/core.schema.ts#L214)

Minimal issue shape (`error.issues` entries).

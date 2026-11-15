[katanakit-js](../index.md) / WpRoleAuditSchema

# Variable: WpRoleAuditSchema

```ts
const WpRoleAuditSchema: ZodObject<{
  declared: ZodArray<ZodString>;
  granted: ZodArray<ZodString>;
  holders: ZodNumber;
  missing: ZodArray<ZodString>;
  slug: ZodString;
  status: ZodEnum<{
     partial: "partial";
     unverifiable: "unverifiable";
     verified: "verified";
  }>;
  undeclared: ZodArray<ZodString>;
}, $strip>;
```

Defined in: [schemas/wordpress.schema.ts:682](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/wordpress.schema.ts#L682)

The result of auditing a declared role against what WordPress reports.

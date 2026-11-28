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

Defined in: [schemas/wordpress.schema.ts:673](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/wordpress.schema.ts#L673)

The result of auditing a declared role against what WordPress reports.

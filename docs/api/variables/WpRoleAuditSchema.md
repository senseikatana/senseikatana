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

Defined in: [schemas/wordpress.schema.ts:682](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/wordpress.schema.ts#L682)

The result of auditing a declared role against what WordPress reports.

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

Defined in: [schemas/wordpress.schema.ts:682](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/wordpress.schema.ts#L682)

The result of auditing a declared role against what WordPress reports.

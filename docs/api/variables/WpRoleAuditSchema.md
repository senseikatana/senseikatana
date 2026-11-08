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

Defined in: [schemas/wordpress.schema.ts:682](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/wordpress.schema.ts#L682)

The result of auditing a declared role against what WordPress reports.

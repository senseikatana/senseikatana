[katanakit-js](../index.md) / DateUnitSchema

# Variable: DateUnitSchema

```ts
const DateUnitSchema: ZodEnum<{
  days: "days";
  hours: "hours";
  minutes: "minutes";
  months: "months";
  quarters: "quarters";
  weeks: "weeks";
  years: "years";
}>;
```

Defined in: [schemas/core.schema.ts:147](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/core.schema.ts#L147)

Granularity of a date calculation, matching Notion's formula vocabulary.

Quarters are included because a calendar quarter is the unit a business
actually reports in, and it is exactly three months — no extra calendar
concept needed. Ordered coarsest to finest so a sorted union stays readable.

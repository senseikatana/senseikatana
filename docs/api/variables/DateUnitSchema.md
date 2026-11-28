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

Defined in: [schemas/core.schema.ts:138](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/core.schema.ts#L138)

Granularity of a date calculation, matching Notion's formula vocabulary.

Quarters are included because a calendar quarter is the unit a business
actually reports in, and it is exactly three months — no extra calendar
concept needed. Ordered coarsest to finest so a sorted union stays readable.

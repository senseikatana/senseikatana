[katanakit-js](../index.md) / FakeVehicleSchema

# Variable: FakeVehicleSchema

```ts
const FakeVehicleSchema: ZodObject<{
  brand: ZodString;
  color: ZodString;
  fuel: ZodString;
  model: ZodString;
  plate: ZodString;
  type: ZodString;
  vin: ZodString;
}, $strip>;
```

Defined in: [schemas/faker.schema.ts:4](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/schemas/faker.schema.ts#L4)

Generic fake vehicle shape returned by `onFakeVehicle`.

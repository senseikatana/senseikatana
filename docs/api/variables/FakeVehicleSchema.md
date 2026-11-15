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

Defined in: [schemas/faker.schema.ts:4](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/schemas/faker.schema.ts#L4)

Generic fake vehicle shape returned by `useFakeVehicle`.

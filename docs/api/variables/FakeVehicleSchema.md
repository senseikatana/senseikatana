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

Defined in: [schemas/faker.schema.ts:4](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/schemas/faker.schema.ts#L4)

Generic fake vehicle shape returned by `useFakeVehicle`.

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

Defined in: [schemas/faker.schema.ts:4](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/schemas/faker.schema.ts#L4)

Generic fake vehicle shape returned by `useFakeVehicle`.

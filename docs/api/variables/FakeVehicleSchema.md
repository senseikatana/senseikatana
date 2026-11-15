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

Defined in: [schemas/faker.schema.ts:4](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/schemas/faker.schema.ts#L4)

Generic fake vehicle shape returned by `useFakeVehicle`.

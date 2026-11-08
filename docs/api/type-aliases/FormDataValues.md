[katanakit-js](../index.md) / FormDataValues

# Type Alias: FormDataValues

```ts
type FormDataValues = Record<string, unknown>;
```

Defined in: [types/core/forms.ts:22](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/forms.ts#L22)

Flat `name` → value map read from a native `FormData`, with dotted names
expanded into nested objects (`"address.city"` → `{ address: { city } }`)
so field names line up with a nested Zod schema.

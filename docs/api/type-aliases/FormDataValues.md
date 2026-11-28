[katanakit-js](../index.md) / FormDataValues

# Type Alias: FormDataValues

```ts
type FormDataValues = Record<string, unknown>;
```

Defined in: [types/core/forms.ts:22](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/types/core/forms.ts#L22)

Flat `name` → value map read from a native `FormData`, with dotted names
expanded into nested objects (`"address.city"` → `{ address: { city } }`)
so field names line up with a nested Zod schema.

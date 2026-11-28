[katanakit-js](../index.md) / FormDataValues

# Type Alias: FormDataValues

```ts
type FormDataValues = Record<string, unknown>;
```

Defined in: [types/core/forms.ts:19](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/forms.ts#L19)

Flat `name` → value map read from a native `FormData`, with dotted names
expanded into nested objects (`"address.city"` → `{ address: { city } }`)
so field names line up with a nested Zod schema.

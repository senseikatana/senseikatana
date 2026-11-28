[katanakit-js](../index.md) / FormValidation

# Type Alias: FormValidation\<T\>

```ts
type FormValidation<T> = 
  | {
  errors: FieldErrors;
  ok: true;
  values: T;
}
  | {
  errors: FieldErrors;
  ok: false;
  values: null;
};
```

Defined in: [types/core/forms.ts:8](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/types/core/forms.ts#L8)

Outcome of validating a native form: the parsed values, or the per-field
messages that blocked them. Both shapes carry `errors` so the caller can
render an empty map on success without a branch.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |

[katanakit-js](../index.md) / FormSubmitHandler

# Type Alias: FormSubmitHandler\<T\>

```ts
type FormSubmitHandler<T> = (values) => void | Promise<void>;
```

Defined in: [types/core/forms.ts:12](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/types/core/forms.ts#L12)

Receives the parsed, typed values once validation passes. May be async; the adapters keep the submit button busy until it settles.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `values` | `T` |

## Returns

`void` \| `Promise`\<`void`\>

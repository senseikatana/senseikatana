[katanakit-js](../index.md) / FormSubmitHandler

# Type Alias: FormSubmitHandler\<T\>

```ts
type FormSubmitHandler<T> = (values) => void | Promise<void>;
```

Defined in: [types/core/forms.ts:15](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/types/core/forms.ts#L15)

Receives the parsed, typed values once validation passes. May be async;
the adapters keep the submit button busy until it settles.

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `values` | `T` |

## Returns

`void` \| `Promise`\<`void`\>

[katanakit-js](../index.md) / FormSubmitHandler

# Type Alias: FormSubmitHandler\<T\>

```ts
type FormSubmitHandler<T> = (values) => void | Promise<void>;
```

Defined in: [types/core/forms.ts:15](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/types/core/forms.ts#L15)

Receives the parsed, typed values once validation passes. May be async;
the adapters keep the submit button busy until it settles.

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

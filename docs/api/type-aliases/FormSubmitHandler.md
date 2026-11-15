[katanakit-js](../index.md) / FormSubmitHandler

# Type Alias: FormSubmitHandler\<T\>

```ts
type FormSubmitHandler<T> = (values) => void | Promise<void>;
```

Defined in: [types/core/forms.ts:15](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/types/core/forms.ts#L15)

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

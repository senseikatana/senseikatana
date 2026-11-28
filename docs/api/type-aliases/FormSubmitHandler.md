[katanakit-js](../index.md) / FormSubmitHandler

# Type Alias: FormSubmitHandler\<T\>

```ts
type FormSubmitHandler<T> = (values) => void | Promise<void>;
```

Defined in: [types/core/forms.ts:15](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/types/core/forms.ts#L15)

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

[katanakit-js](../index.md) / useGetElementById

# Function: useGetElementById()

```ts
function useGetElementById<T>(id): T | null;
```

Defined in: [infrastructure/dom/dom.service.ts:74](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/infrastructure/dom/dom.service.ts#L74)

Finds an element by its `id` attribute.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| <a id="type-parameter-t"></a> `T` *extends* `HTMLElement` | `HTMLElement` | The expected HTMLElement subtype. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `id` | `string` | The element id (without `#`). |

## Returns

`T` \| `null`

The matching element, or `null`.

## Example

```ts
const btn = useGetElementById<HTMLButtonElement>("submit-btn");
```

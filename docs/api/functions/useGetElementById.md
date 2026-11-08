[katanakit-js](../index.md) / useGetElementById

# Function: useGetElementById()

```ts
function useGetElementById<T>(id): T | null;
```

Defined in: [infrastructure/dom/dom.service.ts:74](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/dom/dom.service.ts#L74)

Finds an element by its `id` attribute.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `T` *extends* `HTMLElement` | `HTMLElement` | The expected HTMLElement subtype. |

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

[katanakit-js](../index.md) / useGetElementByClass

# Function: useGetElementByClass()

```ts
function useGetElementByClass<T>(className): T | null;
```

Defined in: [infrastructure/dom/dom.service.ts:92](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/infrastructure/dom/dom.service.ts#L92)

Finds the first element matching a class name.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| <a id="type-parameter-t"></a> `T` *extends* `HTMLElement` | `HTMLElement` | The expected HTMLElement subtype. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `className` | `string` | A class name, with or without a leading `.`. |

## Returns

`T` \| `null`

The matching element, or `null`.

## Example

```ts
const card = useGetElementByClass(".card");
const card2 = useGetElementByClass("card"); // equivalent
```

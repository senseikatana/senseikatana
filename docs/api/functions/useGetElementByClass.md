[katanakit-js](../index.md) / useGetElementByClass

# Function: useGetElementByClass()

```ts
function useGetElementByClass<T>(className): T | null;
```

Defined in: [infrastructure/dom/dom.service.ts:92](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/dom/dom.service.ts#L92)

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

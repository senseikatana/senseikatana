[katanakit-js](../index.md) / useGetElementByClass

# Function: useGetElementByClass()

```ts
function useGetElementByClass<T>(className): T | null;
```

Defined in: [infrastructure/dom/dom.service.ts:92](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/dom/dom.service.ts#L92)

Finds the first element matching a class name.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `T` *extends* `HTMLElement` | `HTMLElement` | The expected HTMLElement subtype. |

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

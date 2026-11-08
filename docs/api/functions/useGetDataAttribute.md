[katanakit-js](../index.md) / useGetDataAttribute

# Function: useGetDataAttribute()

```ts
function useGetDataAttribute(target, key): string | undefined;
```

Defined in: [infrastructure/dom/dom.service.ts:317](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/dom/dom.service.ts#L317)

Gets a `data-*` attribute value from the target element.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `target` | `string` \| `HTMLElement` | A CSS selector string or an HTMLElement instance. |
| `key` | `string` | The data key (without the `data-` prefix). |

## Returns

`string` \| `undefined`

The data attribute value, or `undefined`.

## Example

```ts
const id = useGetDataAttribute("tr.row", "userId");
```

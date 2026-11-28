[katanakit-js](../index.md) / useGetDataAttribute

# Function: useGetDataAttribute()

```ts
function useGetDataAttribute(target, key): string | undefined;
```

Defined in: [infrastructure/dom/dom.service.ts:317](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/dom/dom.service.ts#L317)

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

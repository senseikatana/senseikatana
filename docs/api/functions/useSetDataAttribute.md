[katanakit-js](../index.md) / useSetDataAttribute

# Function: useSetDataAttribute()

```ts
function useSetDataAttribute(
   target, 
   key, 
   value
): void;
```

Defined in: [infrastructure/dom/dom.service.ts:336](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/dom/dom.service.ts#L336)

Sets a `data-*` attribute on the target element.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `target` | `string` \| `HTMLElement` | A CSS selector string or an HTMLElement instance. |
| `key` | `string` | The data key (without the `data-` prefix). |
| `value` | `string` | The value to set. |

## Returns

`void`

## Example

```ts
useSetDataAttribute("tr.row", "status", "active");
```

[katanakit-js](../index.md) / useLazyLoaderInit

# Function: useLazyLoaderInit()

```ts
function useLazyLoaderInit(
   key?, 
   selector?, 
   rootMargin?
): void;
```

Defined in: [infrastructure/observer/observer.service.ts:227](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/observer/observer.service.ts#L227)

Initializes lazy loading for images using IntersectionObserver.
Elements matching the selector must have a `data-src` attribute with the real image URL.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `key` | `string` | `"default"` | A unique identifier for this lazy-loader instance (default: `"default"`). |
| `selector` | `string` | `"img[data-src]"` | CSS selector for lazy-loadable images (default: `"img[data-src]"`). |
| `rootMargin` | `string` | `"200px"` | IntersectionObserver root margin (default: `"200px"`). |

## Returns

`void`

## Example

```ts
useLazyLoaderInit("gallery", "img[data-src]", "300px");
```

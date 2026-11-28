[katanakit-js](../index.md) / onIsSupported

# Function: onIsSupported()

```ts
function onIsSupported(): boolean;
```

Defined in: [infrastructure/observer/observer.service.ts:50](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/observer/observer.service.ts#L50)

Checks whether `IntersectionObserver` is available in the current environment.

## Returns

`boolean`

`true` if `IntersectionObserver` is supported.

## Example

```ts
if (onIsSupported()) {
  // safe to use observer APIs
}
```

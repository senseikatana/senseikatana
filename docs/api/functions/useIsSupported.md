[katanakit-js](../index.md) / useIsSupported

# Function: useIsSupported()

```ts
function useIsSupported(): boolean;
```

Defined in: [infrastructure/observer/observer.service.ts:50](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/observer/observer.service.ts#L50)

Checks whether `IntersectionObserver` is available in the current environment.

## Returns

`boolean`

`true` if `IntersectionObserver` is supported.

## Example

```ts
if (useIsSupported()) {
  // safe to use observer APIs
}
```

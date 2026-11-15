[katanakit-js](../index.md) / useIsSupported

# Function: useIsSupported()

```ts
function useIsSupported(): boolean;
```

Defined in: [infrastructure/observer/observer.service.ts:50](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/infrastructure/observer/observer.service.ts#L50)

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

[katanakit-js](../index.md) / useIsSupported

# Function: useIsSupported()

```ts
function useIsSupported(): boolean;
```

Defined in: [infrastructure/observer/observer.service.ts:50](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/infrastructure/observer/observer.service.ts#L50)

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

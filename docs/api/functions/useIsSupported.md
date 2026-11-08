[katanakit-js](../index.md) / useIsSupported

# Function: useIsSupported()

```ts
function useIsSupported(): boolean;
```

Defined in: [infrastructure/observer/observer.service.ts:50](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/observer/observer.service.ts#L50)

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

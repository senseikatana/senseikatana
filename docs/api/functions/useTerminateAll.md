[katanakit-js](../index.md) / useTerminateAll

# Function: useTerminateAll()

```ts
function useTerminateAll(): void;
```

Defined in: [infrastructure/worker/worker.service.ts:268](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/worker/worker.service.ts#L268)

Terminates all active Worker pools and rejects any in-flight tasks.

## Returns

`void`

## Example

```ts
useTerminateAll();
```

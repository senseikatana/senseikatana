[katanakit-js](../index.md) / useTerminateAll

# Function: useTerminateAll()

```ts
function useTerminateAll(): void;
```

Defined in: [infrastructure/worker/worker.service.ts:268](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/worker/worker.service.ts#L268)

Terminates all active Worker pools and rejects any in-flight tasks.

## Returns

`void`

## Example

```ts
useTerminateAll();
```

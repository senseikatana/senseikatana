[katanakit-js](../index.md) / onTerminate

# Function: onTerminate()

```ts
function onTerminate(key): void;
```

Defined in: [infrastructure/worker/worker.service.ts:241](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/worker/worker.service.ts#L241)

Terminates a specific Worker pool and rejects any in-flight tasks.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | The pool key to terminate. |

## Returns

`void`

## Example

```ts
onTerminate("heavy");
```

[katanakit-js](../index.md) / useSleep

# Function: useSleep()

```ts
function useSleep(ms): Promise<void>;
```

Defined in: [core/services/utils.service.ts:524](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/core/services/utils.service.ts#L524)

Returns a promise that resolves after `ms` milliseconds.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `ms` | `number` |

## Returns

`Promise`\<`void`\>

## Example

```ts
await useSleep(1000);
```

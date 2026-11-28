[katanakit-js](../index.md) / onSleep

# Variable: onSleep

```ts
onSleep: (ms) => Promise<void>;
```

Defined in: [core/services/utils.service.ts:410](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/utils.service.ts#L410)

Returns a promise that resolves after `ms` milliseconds.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `ms` | `number` | Delay in milliseconds. |

## Returns

`Promise`\<`void`\>

A promise that resolves after the delay.

## Example

```ts
await onSleep(1000); // waits 1 second
```

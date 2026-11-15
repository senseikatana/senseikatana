[katanakit-js](../index.md) / useOnDeviceMotion

# Function: useOnDeviceMotion()

```ts
function useOnDeviceMotion(callback): (() => void) | null;
```

Defined in: [infrastructure/sensors/sensors.service.ts:254](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/infrastructure/sensors/sensors.service.ts#L254)

Listens for device motion events (acceleration, rotation rate).

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | (`event`) => `void` | Called with each `DeviceMotionEvent`. |

## Returns

(() => `void`) \| `null`

A cleanup function that removes the listener, or `null` if unavailable.

## Example

```ts
const off = useOnDeviceMotion((e) => {
  console.log("Acceleration:", e.acceleration);
});
```

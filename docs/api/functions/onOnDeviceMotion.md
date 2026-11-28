[katanakit-js](../index.md) / onOnDeviceMotion

# Function: onOnDeviceMotion()

```ts
function onOnDeviceMotion(callback): (() => void) | null;
```

Defined in: [infrastructure/sensors/sensors.service.ts:254](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/sensors/sensors.service.ts#L254)

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
const off = onOnDeviceMotion((e) => {
  console.log("Acceleration:", e.acceleration);
});
```

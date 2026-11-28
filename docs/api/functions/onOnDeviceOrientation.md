[katanakit-js](../index.md) / onOnDeviceOrientation

# Function: onOnDeviceOrientation()

```ts
function onOnDeviceOrientation(callback): (() => void) | null;
```

Defined in: [infrastructure/sensors/sensors.service.ts:229](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/sensors/sensors.service.ts#L229)

Listens for device orientation events (compass heading, tilt).

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | (`event`) => `void` | Called with each `DeviceOrientationEvent`. |

## Returns

(() => `void`) \| `null`

A cleanup function that removes the listener, or `null` if unavailable.

## Example

```ts
const off = onOnDeviceOrientation((e) => {
  console.log("Alpha:", e.alpha);
});
```

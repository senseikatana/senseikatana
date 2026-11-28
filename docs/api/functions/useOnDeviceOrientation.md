[katanakit-js](../index.md) / useOnDeviceOrientation

# Function: useOnDeviceOrientation()

```ts
function useOnDeviceOrientation(callback): (() => void) | null;
```

Defined in: [infrastructure/sensors/sensors.service.ts:229](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/sensors/sensors.service.ts#L229)

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
const off = useOnDeviceOrientation((e) => {
  console.log("Alpha:", e.alpha);
});
```

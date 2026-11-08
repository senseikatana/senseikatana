[katanakit-js](../index.md) / useOnDeviceOrientation

# Function: useOnDeviceOrientation()

```ts
function useOnDeviceOrientation(callback): (() => void) | null;
```

Defined in: [infrastructure/sensors/sensors.service.ts:229](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/sensors/sensors.service.ts#L229)

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

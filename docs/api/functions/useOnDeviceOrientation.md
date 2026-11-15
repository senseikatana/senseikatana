[katanakit-js](../index.md) / useOnDeviceOrientation

# Function: useOnDeviceOrientation()

```ts
function useOnDeviceOrientation(callback): (() => void) | null;
```

Defined in: [infrastructure/sensors/sensors.service.ts:229](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/infrastructure/sensors/sensors.service.ts#L229)

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

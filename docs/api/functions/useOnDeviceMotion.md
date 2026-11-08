[katanakit-js](../index.md) / useOnDeviceMotion

# Function: useOnDeviceMotion()

```ts
function useOnDeviceMotion(callback): (() => void) | null;
```

Defined in: [infrastructure/sensors/sensors.service.ts:254](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/sensors/sensors.service.ts#L254)

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

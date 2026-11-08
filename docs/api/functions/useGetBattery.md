[katanakit-js](../index.md) / useGetBattery

# Function: useGetBattery()

```ts
function useGetBattery(): Promise<BatteryManager | null>;
```

Defined in: [infrastructure/sensors/sensors.service.ts:315](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/sensors/sensors.service.ts#L315)

Gets the device battery status.

## Returns

`Promise`\<[`BatteryManager`](../interfaces/BatteryManager.md) \| `null`\>

A `BatteryManager` object or `null` if the API is unavailable.

## Example

```ts
const battery = await useGetBattery();
if (battery) {
  console.log(`${Math.round(battery.level * 100)}%`);
}
```

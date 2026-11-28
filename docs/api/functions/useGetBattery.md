[katanakit-js](../index.md) / useGetBattery

# Function: useGetBattery()

```ts
function useGetBattery(): Promise<BatteryManager | null>;
```

Defined in: [infrastructure/sensors/sensors.service.ts:315](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/sensors/sensors.service.ts#L315)

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

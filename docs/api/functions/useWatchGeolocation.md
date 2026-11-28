[katanakit-js](../index.md) / useWatchGeolocation

# Function: useWatchGeolocation()

```ts
function useWatchGeolocation(callback, options?): (() => void) | null;
```

Defined in: [infrastructure/sensors/sensors.service.ts:152](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/sensors/sensors.service.ts#L152)

Continuously watches the device's geographic position.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | (`position`) => `void` | Called with a [GeoPosition](../type-aliases/GeoPosition.md) on each position update. |
| `options?` | `PositionOptions` | Optional PositionOptions to override defaults. |

## Returns

(() => `void`) \| `null`

A cleanup function that stops watching, or `null` if unavailable.

## Example

```ts
const stop = useWatchGeolocation((pos) => {
  console.log("Moved to", pos.lat, pos.lng);
});
// later:
stop?.();
```

[katanakit-js](../index.md) / onWatchGeolocation

# Function: onWatchGeolocation()

```ts
function onWatchGeolocation(callback, options?): (() => void) | null;
```

Defined in: [infrastructure/sensors/sensors.service.ts:152](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/sensors/sensors.service.ts#L152)

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
const stop = onWatchGeolocation((pos) => {
  console.log("Moved to", pos.lat, pos.lng);
});
// later:
stop?.();
```

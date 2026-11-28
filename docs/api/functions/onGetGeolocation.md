[katanakit-js](../index.md) / onGetGeolocation

# Function: onGetGeolocation()

```ts
function onGetGeolocation(options?): Promise<
  | {
  accuracy: number;
  lat: number;
  lng: number;
}
| null>;
```

Defined in: [infrastructure/sensors/sensors.service.ts:115](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/sensors/sensors.service.ts#L115)

Gets the device's current geographic position once.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | `PositionOptions` | Optional PositionOptions to override defaults. |

## Returns

`Promise`\<
  \| \{
  `accuracy`: `number`;
  `lat`: `number`;
  `lng`: `number`;
\}
  \| `null`\>

A [GeoPosition](../type-aliases/GeoPosition.md) object or `null` on error / unavailability.

## Example

```ts
const pos = await onGetGeolocation({ enableHighAccuracy: true });
if (pos) console.log(`${pos.lat}, ${pos.lng}`);
```

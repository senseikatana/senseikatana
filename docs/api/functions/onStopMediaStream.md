[katanakit-js](../index.md) / onStopMediaStream

# Function: onStopMediaStream()

```ts
function onStopMediaStream(stream): void;
```

Defined in: [infrastructure/sensors/sensors.service.ts:63](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/sensors/sensors.service.ts#L63)

Stops all tracks in a media stream (releases camera/microphone).

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `stream` | `MediaStream` \| `null` | The MediaStream to stop, or `null`. |

## Returns

`void`

## Example

```ts
const stream = await onGetMediaStream();
// ... use stream ...
onStopMediaStream(stream);
```

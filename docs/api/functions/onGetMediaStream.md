[katanakit-js](../index.md) / onGetMediaStream

# Function: onGetMediaStream()

```ts
function onGetMediaStream(constraints?): Promise<MediaStream | null>;
```

Defined in: [infrastructure/sensors/sensors.service.ts:35](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/sensors/sensors.service.ts#L35)

Requests a media stream (camera, microphone, or both).

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `constraints?` | `MediaStreamConstraints` | MediaStream constraints (default: video + audio). |

## Returns

`Promise`\<`MediaStream` \| `null`\>

A `MediaStream` or `null` if the API is unavailable or permission is denied.

## Example

```ts
const stream = await onGetMediaStream({ video: true, audio: false });
if (stream) {
  videoElement.srcObject = stream;
}
```

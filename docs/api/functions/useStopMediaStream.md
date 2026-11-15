[katanakit-js](../index.md) / useStopMediaStream

# Function: useStopMediaStream()

```ts
function useStopMediaStream(stream): void;
```

Defined in: [infrastructure/sensors/sensors.service.ts:63](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/infrastructure/sensors/sensors.service.ts#L63)

Stops all tracks in a media stream (releases camera/microphone).

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `stream` | `MediaStream` \| `null` | The MediaStream to stop, or `null`. |

## Returns

`void`

## Example

```ts
const stream = await useGetMediaStream();
// ... use stream ...
useStopMediaStream(stream);
```

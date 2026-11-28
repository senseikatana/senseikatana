[katanakit-js](../index.md) / useStopMediaStream

# Function: useStopMediaStream()

```ts
function useStopMediaStream(stream): void;
```

Defined in: [infrastructure/sensors/sensors.service.ts:63](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/infrastructure/sensors/sensors.service.ts#L63)

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

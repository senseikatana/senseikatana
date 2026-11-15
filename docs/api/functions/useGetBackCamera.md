[katanakit-js](../index.md) / useGetBackCamera

# Function: useGetBackCamera()

```ts
function useGetBackCamera(): Promise<MediaStream | null>;
```

Defined in: [infrastructure/sensors/sensors.service.ts:95](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/infrastructure/sensors/sensors.service.ts#L95)

Opens the back-facing (environment) camera.

## Returns

`Promise`\<`MediaStream` \| `null`\>

A video-only `MediaStream` or `null`.

## Example

```ts
const rearStream = await useGetBackCamera();
```

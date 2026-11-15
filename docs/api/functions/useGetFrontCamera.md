[katanakit-js](../index.md) / useGetFrontCamera

# Function: useGetFrontCamera()

```ts
function useGetFrontCamera(): Promise<MediaStream | null>;
```

Defined in: [infrastructure/sensors/sensors.service.ts:81](https://github.com/senseikatana/katanakit-js/blob/4757447f65524cf82c4895860832b7d5c4bd38db/src/infrastructure/sensors/sensors.service.ts#L81)

Opens the front-facing (user) camera.

## Returns

`Promise`\<`MediaStream` \| `null`\>

A video-only `MediaStream` or `null`.

## Example

```ts
const selfieStream = await useGetFrontCamera();
```

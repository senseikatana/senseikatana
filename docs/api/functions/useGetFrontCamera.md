[katanakit-js](../index.md) / useGetFrontCamera

# Function: useGetFrontCamera()

```ts
function useGetFrontCamera(): Promise<MediaStream | null>;
```

Defined in: [infrastructure/sensors/sensors.service.ts:81](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/sensors/sensors.service.ts#L81)

Opens the front-facing (user) camera.

## Returns

`Promise`\<`MediaStream` \| `null`\>

A video-only `MediaStream` or `null`.

## Example

```ts
const selfieStream = await useGetFrontCamera();
```

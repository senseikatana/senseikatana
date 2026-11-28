[katanakit-js](../index.md) / onGetFrontCamera

# Function: onGetFrontCamera()

```ts
function onGetFrontCamera(): Promise<MediaStream | null>;
```

Defined in: [infrastructure/sensors/sensors.service.ts:81](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/sensors/sensors.service.ts#L81)

Opens the front-facing (user) camera.

## Returns

`Promise`\<`MediaStream` \| `null`\>

A video-only `MediaStream` or `null`.

## Example

```ts
const selfieStream = await onGetFrontCamera();
```

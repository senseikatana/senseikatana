[katanakit-js](../index.md) / useRequestMotionPermission

# Function: useRequestMotionPermission()

```ts
function useRequestMotionPermission(): Promise<boolean>;
```

Defined in: [infrastructure/sensors/sensors.service.ts:192](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/infrastructure/sensors/sensors.service.ts#L192)

Requests permission to access device orientation/motion sensors (required on iOS 13+).

## Returns

`Promise`\<`boolean`\>

`true` if permission is granted or already available, `false` otherwise.

## Example

```ts
const granted = await useRequestMotionPermission();
if (granted) {
  useOnDeviceOrientation((e) => console.log(e.alpha, e.beta));
}
```

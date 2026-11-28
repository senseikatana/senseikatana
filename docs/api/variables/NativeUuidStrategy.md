[katanakit-js](../index.md) / NativeUuidStrategy

# Variable: NativeUuidStrategy

```ts
const NativeUuidStrategy: IUuidStrategy;
```

Defined in: [core/services/generator.service.ts:243](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/core/services/generator.service.ts#L243)

Native UUID strategy using `globalThis.crypto.randomUUID`, with a fallback —
thin adapter over [GeneratorService.useUuid](../classes/GeneratorService.md#useuuid) satisfying [IUuidStrategy](../interfaces/IUuidStrategy.md).

## See

[GeneratorService.useUuid](../classes/GeneratorService.md#useuuid)

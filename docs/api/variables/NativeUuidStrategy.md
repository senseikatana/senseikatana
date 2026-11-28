[katanakit-js](../index.md) / NativeUuidStrategy

# Variable: NativeUuidStrategy

```ts
const NativeUuidStrategy: IUuidStrategy;
```

Defined in: [core/services/generator.service.ts:243](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/core/services/generator.service.ts#L243)

Native UUID strategy using `globalThis.crypto.randomUUID`, with a fallback —
thin adapter over [GeneratorService.uuid](../classes/GeneratorService.md#uuid) satisfying [IUuidStrategy](../interfaces/IUuidStrategy.md).

## See

[GeneratorService.uuid](../classes/GeneratorService.md#uuid)

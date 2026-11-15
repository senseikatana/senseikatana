[katanakit-js](../index.md) / NativeUuidStrategy

# Variable: NativeUuidStrategy

```ts
const NativeUuidStrategy: IUuidStrategy;
```

Defined in: [core/services/generator.service.ts:243](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/core/services/generator.service.ts#L243)

Native UUID strategy using `globalThis.crypto.randomUUID`, with a fallback —
thin adapter over [GeneratorService.useUuid](../classes/GeneratorService.md#useuuid) satisfying [IUuidStrategy](../interfaces/IUuidStrategy.md).

## See

[GeneratorService.useUuid](../classes/GeneratorService.md#useuuid)

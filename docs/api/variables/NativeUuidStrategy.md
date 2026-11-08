[katanakit-js](../index.md) / NativeUuidStrategy

# Variable: NativeUuidStrategy

```ts
const NativeUuidStrategy: IUuidStrategy;
```

Defined in: [core/services/generator.service.ts:243](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/generator.service.ts#L243)

Native UUID strategy using `globalThis.crypto.randomUUID`, with a fallback —
thin adapter over [GeneratorService.useUuid](../classes/GeneratorService.md#useuuid) satisfying [IUuidStrategy](../interfaces/IUuidStrategy.md).

## See

[GeneratorService.useUuid](../classes/GeneratorService.md#useuuid)

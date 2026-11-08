[katanakit-js](../index.md) / CacheDecoratorOptions

# Interface: CacheDecoratorOptions

Defined in: [infrastructure/decorators/cache.decorator.ts:30](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/decorators/cache.decorator.ts#L30)

CacheDecorator - Decorator Pattern para caché de resultados.

Envuelve una función asíncrona y memoiza su resultado por clave (los
argumentos serializados por defecto). No modifica la función original:
la caché se añade en tiempo de composición (Open/Closed).

Nota: el nombre usa mayúscula inicial porque es un decorador composible,
no una función utilitaria (`use*`) del API pública.

## Type Param

**T**

Tipo de la función envuelta.

## Param

**fn**

La función asíncrona a decorar.

## Param

**options**

TTL en ms y estrategia de clave.

## Example

```ts
import { CacheDecorator } from "katanakit-js";

const getCached = CacheDecorator(fetchUser, { ttlMs: 60_000 });
await getCached(1); // consulta
await getCached(1); // sirve de caché
```

## Remarks

Keys live in a `Map` (no prototype-pollution risk). Expired
entries are reclaimed lazily — when their key is requested again — and
`useClearCache()` drops everything. For high-cardinality keys (unbounded
input space) call `useClearCache()` periodically or set a `ttlMs`.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="keyfn"></a> `keyFn?` | (...`args`) => `string` | Genera la clave de caché a partir de los argumentos. | [infrastructure/decorators/cache.decorator.ts:34](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/decorators/cache.decorator.ts#L34) |
| <a id="ttlms"></a> `ttlMs?` | `number` | Time-to-live de cada entrada en milisegundos. `0` = sin expiración. | [infrastructure/decorators/cache.decorator.ts:32](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/decorators/cache.decorator.ts#L32) |

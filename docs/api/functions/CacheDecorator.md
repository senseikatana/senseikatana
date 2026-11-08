[katanakit-js](../index.md) / CacheDecorator

# Function: CacheDecorator()

```ts
function CacheDecorator<T>(fn, options?): T & {
  useCacheSize: () => number;
  useClearCache: () => void;
};
```

Defined in: [infrastructure/decorators/cache.decorator.ts:70](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/infrastructure/decorators/cache.decorator.ts#L70)

Decorates an async function with memoized results (Decorator Pattern).

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* (...`args`) => `Promise`\<`unknown`\> | The async function type. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fn` | `T` | The function to decorate. |
| `options` | [`CacheDecoratorOptions`](../interfaces/CacheDecoratorOptions.md) | TTL and key strategy. |

## Returns

`T` & \{
  `useCacheSize`: () => `number`;
  `useClearCache`: () => `void`;
\}

The decorated function with an attached cache registry.

## Example

```ts
const getCached = CacheDecorator(async (id: number) => fetchUser(id), { ttlMs: 30_000 });
```

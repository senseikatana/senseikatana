[katanakit-js](../index.md) / CacheDecorator

# Function: CacheDecorator()

```ts
function CacheDecorator<T>(fn, options?): T & {
  useCacheSize: () => number;
  useClearCache: () => void;
};
```

Defined in: [infrastructure/decorators/cache.decorator.ts:70](https://github.com/senseikatana/katanakit-js/blob/7e04a13a3a42c7c397fae8774d321995fcb3d5ef/src/infrastructure/decorators/cache.decorator.ts#L70)

Decorates an async function with memoized results (Decorator Pattern).

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` *extends* (...`args`) => `Promise`\<`unknown`\> | The async function type. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fn` | `T` | The function to decorate. |
| `options?` | [`CacheDecoratorOptions`](../interfaces/CacheDecoratorOptions.md) | TTL and key strategy. |

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

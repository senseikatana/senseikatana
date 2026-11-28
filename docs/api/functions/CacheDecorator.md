[katanakit-js](../index.md) / CacheDecorator

# Function: CacheDecorator()

```ts
function CacheDecorator<T>(fn, options?): T & {
  onCacheSize: () => number;
  onClearCache: () => void;
};
```

Defined in: [infrastructure/decorators/cache.decorator.ts:67](https://github.com/senseikatana/katanakit-js/blob/d0c71bf0d799a28bbecce0cc0b37ec4082e11b5d/src/infrastructure/decorators/cache.decorator.ts#L67)

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
  `onCacheSize`: () => `number`;
  `onClearCache`: () => `void`;
\}

The decorated function with an attached cache registry.

## Example

```ts
const getCached = CacheDecorator(async (id: number) => fetchUser(id), { ttlMs: 30_000 });
```

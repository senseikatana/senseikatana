[katanakit-js](../index.md) / useSplitConfig

# Function: useSplitConfig()

```ts
function useSplitConfig<T>(input): {
  config: ConfigData<T>;
  methods: ConfigMethodEntries<T>;
};
```

Defined in: [core/services/utils.service.ts:596](https://github.com/senseikatana/katanakit-js/blob/fa43771ecc51650d55e9d2de06a20a76879f6691/src/core/services/utils.service.ts#L596)

Splits a `define*Config` literal into its config half and its method half.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` *extends* `object` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | `T` |

## Returns

```ts
{
  config: ConfigData<T>;
  methods: ConfigMethodEntries<T>;
}
```

### config

```ts
config: ConfigData<T>;
```

### methods

```ts
methods: ConfigMethodEntries<T>;
```

## Example

```ts
const { config, methods } = useSplitConfig({ token: "abc", send: async function () {} });
```

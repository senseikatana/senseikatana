[katanakit-js](../index.md) / defineApiConfig

# Function: defineApiConfig()

```ts
function defineApiConfig<T>(input): ConfigFacade<T>;
```

Defined in: [core/services/http.service.ts:543](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/http.service.ts#L543)

Declares the API registry in a single call - the config-file entry point.

Registers every [ApiEntry](../interfaces/ApiEntry.md) you list and returns them alongside the
props, flags and methods declared on the same literal, so one `export default`
is the whole setup: no second registration step.

Only object entries shaped like `{ baseUri, endpoints }` reach the registry;
boolean flags are kept on `config` for your own methods to read.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* `object` | The literal passed in. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `T` & `ThisType`\<[`ConfigFacade`](../type-aliases/ConfigFacade.md)\<`T`\>\> & [`ConfigValues`](../type-aliases/ConfigValues.md)\<`NoInfer`\<`T`\>, [`ApiConfigValue`](../type-aliases/ApiConfigValue.md)\> | API entries, flags and methods in one object literal. |

## Returns

[`ConfigFacade`](../type-aliases/ConfigFacade.md)\<`T`\>

The registered config plus the declared methods (see `ConfigFacade`).

## Throws

If a non-method value is an object that is not an API entry.

## Example

```ts
import { defineApiConfig } from "katanakit-js";

export default defineApiConfig({
  pokeapi: { baseUri: "https://pokeapi.co/api/v2", endpoints: { byId: "/pokemon/:id/" } },
  debug: true,
  getPokemon: async function () {
    return useFetch("pokeapi", "byId", { params: { id: 25 } });
  },
});
```

## Remarks

Methods must be written with `function`, not as arrows - `this.config`
is undefined inside an arrow function.

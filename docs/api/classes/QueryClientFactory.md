[katanakit-js](../index.md) / QueryClientFactory

# Class: QueryClientFactory

Defined in: [core/services/query.service.ts:36](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/query.service.ts#L36)

QueryClientFactory - Factory Pattern para crear instancias de QueryClient.

Centraliza la creación de clientes: `create()` fabrica un cliente nuevo
(por petición en SSR) y `createShared()` reemplaza el singleton compartido.
El resto del código no llama `new QueryClient()` directamente, así que la
política de creación vive en un único punto (Open/Closed).

## Example

```ts
// SSR: un cliente por petición
const client = QueryClientFactory.create({ defaultOptions: { queries: { staleTime: 60_000 } } });

// Browser: singleton compartido
QueryClientFactory.createShared();
```

## Constructors

### Constructor

```ts
new QueryClientFactory(): QueryClientFactory;
```

#### Returns

`QueryClientFactory`

## Methods

### create()

```ts
static create(config?): QueryClient;
```

Defined in: [core/services/query.service.ts:50](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/query.service.ts#L50)

Fabrica un **nuevo** QueryClient. Úsalo en el servidor (SSR) para
obtener un cliente por petición y evitar compartir la caché global.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | `QueryClientConfig` | TanStack QueryClientConfig (caches, default options). |

#### Returns

`QueryClient`

Un QueryClient fresco.

#### Example

```ts
const client = QueryClientFactory.create();
await client.prefetchQuery({ queryKey, queryFn });
```

***

### createShared()

```ts
static createShared(config?): QueryClient;
```

Defined in: [core/services/query.service.ts:61](https://github.com/senseikatana/katanakit-js/blob/c3992e7d4fd571cfc879dcce07696cca9eb2bd14/src/core/services/query.service.ts#L61)

Reemplaza el singleton compartido con un cliente configurado.
Limpia la caché del cliente anterior antes de intercambiarlo.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | `QueryClientConfig` | TanStack QueryClientConfig. |

#### Returns

`QueryClient`

El nuevo QueryClient compartido.

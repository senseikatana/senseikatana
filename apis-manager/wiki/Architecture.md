# Arquitectura

apis-manager organiza su código en cuatro módulos pequeños: tipos, núcleo, adaptador de React y reexports. Esta página describe cada módulo y el flujo de datos entre ellos.

## Diagrama de módulos

```text
data/apis.json ──► initApis() ──► normalizar() ──► _apis (estado global)
_apis ──► buildApiUrl() ──► fetchApi() ──► fetch() ──► FetchResult<T>
                             │
                       fetchApi() ──► fetch() ──► FetchResult<T>
```

## Módulos

- `types.ts`: define los tipos compartidos (`ApiEntry`, `ApisConfig`, `UrlOptions`, `FetchOptions`, `FetchResult`) y no importa nada.
- `core.ts`: guarda el estado global y expone `initApis`, `getApis`, `buildApiUrl` y `fetchApi`.
- `react.ts`: adapta `buildApiUrl` para React con `useMemo` y expone `useApiUrl`.
- `index.ts`: reexporta las funciones y los tipos como API pública de la librería.

## Flujo de datos

El flujo sigue tres pasos:

1. `initApis` recibe el objeto de configuración y lo pasa por `normalizar`, que recorta claves y valores, acepta `baseUrl` como alias de `baseUri` y elimina las barras finales. El resultado se guarda en la variable de módulo `_apis`.
2. `buildApiUrl` busca la API y el endpoint en `_apis`. Sustituye los `:parametro` del template y fusiona `defaultQueryParams` con `options.query` sobre la API nativa `URL`.
3. `fetchApi` llama a `buildApiUrl`, ejecuta `fetch` y devuelve un `FetchResult` tipado.

## Decisiones de diseño

- **Sin clases ni dependencias**: la librería exporta funciones sobre un estado de módulo. El núcleo usa solo APIs estándar (`URL`, `fetch`).
- **Estado global explícito**: `_apis` es un singleton de módulo. `initApis` lo reemplaza entero, así que el orden de inicialización queda bajo tu control.
- **Errores tempranos**: `buildApiUrl` valida API y endpoint antes de salir a la red y lista las opciones disponibles en el mensaje de error.
- **Codificación segura**: los valores dinámicos pasan por `encodeURIComponent` y la query se monta con `URLSearchParams`, no con concatenación manual.

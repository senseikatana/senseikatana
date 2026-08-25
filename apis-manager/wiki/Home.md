# apis-manager

apis-manager es una librería de TypeScript que centraliza la definición de tus APIs en un archivo JSON (JavaScript Object Notation) y construye las URLs con una sola función. Esta página presenta el proyecto, sus módulos y la documentación disponible en la wiki.

## Qué resuelve

Cuando consumes varias APIs en un proyecto, es habitual concatenar cadenas a mano y duplicar la lógica de parámetros en cada llamada. apis-manager separa la definición de las APIs del código que las consume: declaras las rutas una vez en `data/apis.json` y las usas con `buildApiUrl` o `fetchApi` desde cualquier parte del código.

## Características

- **Sin dependencias**: el núcleo usa solo las APIs estándar de la plataforma (`URL` y `fetch`).
- **Agnóstico de framework**: funciona en React, Next.js, Astro, Svelte, Remix y en JavaScript o TypeScript puros.
- **Tipos estrictos**: tipas cada respuesta con genéricos, por ejemplo `fetchApi<Producto>()`.
- **Parámetros seguros**: los valores dinámicos se codifican con `encodeURIComponent` antes de entrar en la URL.
- **Defaults por endpoint**: cada endpoint puede declarar parámetros de consulta que se aplican si no los sobrescribes.
- **Hook de React**: `useApiUrl` construye y memoriza URLs dentro de componentes.

## Módulos del proyecto

- `src/types.ts`: tipos compartidos de la librería.
- `src/core.ts`: configuración global, constructor de URLs y wrapper de `fetch`.
- `src/react.ts`: hook `useApiUrl` para React.
- `src/index.ts`: reexporta la API pública.
- `data/apis.json`: configuración de ejemplo con cinco APIs, incluida dummyjson.com. Cuando uses una API nueva, añade su propio JSON a `data/`.
- `src/demo.js`: demo de uso con JavaScript puro, con destructuring y constantes nombradas.
- `src/demo-react.js`: demo de uso con React y `useApiUrl`, renderizado en el servidor para ejecutarlo desde la terminal.
- `src/demo.ts`: suite de pruebas que valida toda la librería contra la API pública de dummyjson.com.

## Navegación de la wiki

- [Primeros pasos](./Getting-Started.md): instala la librería y haz tu primera petición.
- [Referencia de la API](./API-References.md): consulta la firma de cada función y tipo.
- [Arquitectura](./Architecture.md): entiende el flujo de configuración y construcción de URLs.
- [Roadmap](./Roadmap.md): revisa lo completado y lo planificado.

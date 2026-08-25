# Primeros pasos

Esta guía te lleva desde cero hasta tu primera petición: preparas el entorno, defines tus APIs en `data/apis.json` y haces una llamada real con `fetchApi`.

## Prerrequisitos

Necesitas un runtime con soporte de `fetch` y de la API `URL`:

- Bun 1.0 o superior
- Node.js 18 o superior, con un compilador de TypeScript (como `tsc`) o un runner como `tsx`

## Instalación

Copia las carpetas `src` y `data` dentro de tu proyecto. El núcleo no tiene dependencias, así que no necesitas instalar paquetes.

El código interno usa el alias `@` para importar entre módulos, y los ejemplos importan `data/apis.json` directamente. Registra ambas cosas en tu `tsconfig.json`:

```json
{
  "compilerOptions": {
    "resolveJsonModule": true,
    "paths": { "@/*": ["./src/*"] }
  }
}
```

## Configuración

Declara tus APIs en `data/apis.json`. Cuando uses una API nueva, crea un archivo JSON por API dentro de `data/` (por ejemplo `data/github.json`). Cada API define su `baseUri`, sus `endpoints` y, si hace falta, parámetros de consulta por defecto:

```json
{
  "dummyjson": {
    "baseUri": "https://dummyjson.com",
    "endpoints": {
      "products": "/products",
      "productById": "/products/:id"
    },
    "defaultQueryParams": {
      "products": { "limit": 5 }
    }
  }
}
```

Los endpoints usan `:parametro` para los segmentos dinámicos de la ruta.

## Tu primera petición

Inicializa la configuración una vez al arrancar y usa `fetchApi` con un tipo para la respuesta:

```ts
import { initApis, fetchApi } from './src/index'
import config from './data/apis.json'

interface ProductsResponse {
  products: { id: number; title: string }[]
  total: number
}

initApis(config)

const res = await fetchApi<ProductsResponse>('dummyjson', 'products')
console.log(res.data.products)
```

`fetchApi` devuelve un objeto `FetchResult` con `data`, `url`, `status` y `ok`. Ajusta la ruta de los imports a donde hayas copiado la carpeta `src`.

## Uso con React

El hook `useApiUrl` construye la URL y la memoriza. Devuelve la misma cadena entre renders si no cambian los argumentos:

```tsx
import { initApis, useApiUrl } from './src/index'
import config from './data/apis.json'

initApis(config)

function Producto({ id }: { id: number }) {
  const url = useApiUrl('dummyjson', 'productById', { params: { id } })
  return <a href={url}>Ver producto {id}</a>
}
```

Para usar el hook, tu proyecto debe tener React instalado: la librería solo declara sus tipos (`@types/react`) y no lo incluye como dependencia.

## Demos incluidos

El proyecto incluye tres archivos ejecutables con bun. Los dos primeros muestran la idea central de la librería: `data/apis.json` aporta la `baseUri` y los `endpoints`, y el código los consume con destructuring y constantes nombradas.

```bash
bun run src/demo.js        # JavaScript puro
bun run src/demo-react.js  # React con useApiUrl
bun run src/demo.ts        # Suite de 47 pruebas
```

## Siguiente paso

Revisa la [referencia de la API](./API-References.md) para ver la firma completa de cada función y tipo.

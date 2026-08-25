/**
 * demo.ts
 *
 * Suite de demostración y pruebas de apis-manager.
 *
 * Ejecútala con:
 *
 *   bun run src/demo.ts
 *
 * Cubre toda la librería:
 *   1. initApis y getApis: normalización y configuración global
 *   2. buildApiUrl: construcción de URLs sin salir a la red
 *   3. fetchApi: peticiones HTTP reales contra https://dummyjson.com
 *   4. useApiUrl: render real del hook de React con react-dom/server
 *   5. index.ts: reexports de la API pública
 *
 * dummyjson.com es una API pública que no requiere autenticación.
 * Cada petición incluye una pausa de 200 ms para no saturar el servicio.
 *
 * Los tests del hook de React requieren react y react-dom como
 * devDependencies (bun add -d react react-dom @types/react-dom).
 */

import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import apisJson from '../data/apis.json'
import { initApis, getApis, buildApiUrl, fetchApi } from './core'
import { useApiUrl } from './react'
import * as lib from './index'

// ── Helpers ────────────────────────────────────────────────────────────────

let passed = 0
let failed = 0

function section(title: string): void {
  console.log(`\n${'═'.repeat(64)}`)
  console.log(`  ${title}`)
  console.log(`${'═'.repeat(64)}`)
}

async function check(name: string, fn: () => void | Promise<void>): Promise<void> {
  try {
    await fn()
    passed += 1
    console.log(`  ✅ ${name}`)
  } catch (err) {
    failed += 1
    console.log(`  ❌ ${name}`)
    console.log(`     → ${err instanceof Error ? err.message : String(err)}`)
  }
}

function assert(cond: unknown, message: string): asserts cond {
  if (!cond) throw new Error(message)
}

function assertEqual<T>(actual: T, expected: T, message: string): void {
  if (actual !== expected) {
    throw new Error(`${message}: se esperaba «${String(expected)}», se obtuvo «${String(actual)}»`)
  }
}

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms))

// ── Tipos de respuesta de dummyjson.com ────────────────────────────────────
// Solo se declaran los campos que usan las pruebas.

interface Product {
  id: number
  title: string
  price: number
}

interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

interface User {
  id: number
  firstName: string
  lastName: string
  email: string
}

interface UsersResponse {
  users: User[]
  total: number
  skip: number
  limit: number
}

interface Post {
  id: number
  title: string
  body: string
}

interface PostsResponse {
  posts: Post[]
  total: number
  skip: number
  limit: number
}

interface Comment {
  id: number
  body: string
  postId: number
}

interface CommentsResponse {
  comments: Comment[]
  total: number
  skip: number
  limit: number
}

interface Todo {
  id: number
  todo: string
  completed: boolean
  userId: number
}

interface TodosResponse {
  todos: Todo[]
  total: number
  skip: number
  limit: number
}

interface Quote {
  id: number
  quote: string
  author: string
}

interface QuotesResponse {
  quotes: Quote[]
  total: number
  skip: number
  limit: number
}

// ── Ejecución ──────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  section('1. Configuración: initApis y getApis')

  await check('normalizar recorta claves, valores y barras finales', () => {
    const config = initApis({
      ' apiConEspacios ': {
        baseUri: 'https://api.ejemplo.com/v1///',
        endpoints: { ' ping ': ' /ping ' },
        defaultQueryParams: { ' ping ': { ' token ': 'abc' } },
      },
    })

    assert('apiConEspacios' in config, 'la clave de la API no quedó recortada')
    assertEqual(config.apiConEspacios.baseUri, 'https://api.ejemplo.com/v1', 'baseUri')
    assertEqual(config.apiConEspacios.endpoints.ping, '/ping', 'ruta del endpoint')
    assertEqual(config.apiConEspacios.defaultQueryParams?.ping?.token, 'abc', 'query default')
  })

  await check('normalizar acepta baseUrl como alias de baseUri', () => {
    const config = initApis({
      apiAlias: {
        baseUrl: 'https://alias.ejemplo.com/api///',
        endpoints: { ' lista ': ' /items ' },
      },
    })

    assertEqual(config.apiAlias.baseUri, 'https://alias.ejemplo.com/api', 'baseUri')
    assertEqual(config.apiAlias.endpoints.lista, '/items', 'ruta del endpoint')
  })

  await check('normalizar acepta routes como alias de endpoints', () => {
    const config = initApis({
      apiRutas: { baseUri: 'https://rutas.ejemplo.com', routes: { listado: '/listado' } },
    })

    assertEqual(config.apiRutas.endpoints.listado, '/listado', 'ruta del endpoint')
  })

  await check('sin baseUri ni baseUrl el baseUri queda vacío', () => {
    const config = initApis({ apiVacia: { endpoints: { x: '/x' } } })

    assertEqual(config.apiVacia.baseUri, '', 'baseUri')
  })

  initApis(apisJson as Record<string, unknown>)

  await check('initApis registra las 5 APIs de data/apis.json', () => {
    const apis = getApis()
    assertEqual(Object.keys(apis).length, 5, 'número de APIs')
    assert('primaryApi' in apis, 'falta primaryApi')
    assert('secondaryApi' in apis, 'falta secondaryApi')
    assert('pokeapi' in apis, 'falta pokeapi')
    assert('jsonplaceholder' in apis, 'falta jsonplaceholder')
    assert('dummyjson' in apis, 'falta dummyjson')
  })

  await check('initApis devuelve la misma referencia que getApis', () => {
    assert(initApis(apisJson as Record<string, unknown>) === getApis(), 'las referencias difieren')
  })

  await check('dummyjson quedó registrado con sus 15 endpoints', () => {
    assertEqual(
      Object.keys(getApis().dummyjson.endpoints).length,
      15,
      'número de endpoints'
    )
  })

  section('2. Construcción de URLs: buildApiUrl')

  await check('URL básica con defaultQueryParams aplicado', () => {
    assertEqual(
      buildApiUrl('dummyjson', 'products'),
      'https://dummyjson.com/products?limit=5',
      'URL'
    )
  })

  await check('parámetro de ruta :id', () => {
    assertEqual(
      buildApiUrl('dummyjson', 'productById', { params: { id: 7 } }),
      'https://dummyjson.com/products/7',
      'URL'
    )
  })

  await check('parámetro de ruta numérico se convierte a string', () => {
    assertEqual(
      buildApiUrl('dummyjson', 'productById', { params: { id: 25 } }),
      'https://dummyjson.com/products/25',
      'URL'
    )
  })

  await check('parámetro de ruta :category', () => {
    assertEqual(
      buildApiUrl('dummyjson', 'productByCategory', { params: { category: 'smartphones' } }),
      'https://dummyjson.com/products/category/smartphones',
      'URL'
    )
  })

  await check('parámetro de ruta :postId anidado en el path', () => {
    assertEqual(
      buildApiUrl('dummyjson', 'postComments', { params: { postId: 3 } }),
      'https://dummyjson.com/comments/post/3',
      'URL'
    )
  })

  await check('los valores con espacios se codifican con encodeURIComponent', () => {
    assertEqual(
      buildApiUrl('pokeapi', 'abilityByName', { params: { name: 'static electricity' } }),
      'https://pokeapi.co/api/v2/ability/static%20electricity/',
      'URL'
    )
  })

  await check('el slash final del template se conserva', () => {
    assertEqual(
      buildApiUrl('pokeapi', 'pokemonById', { params: { id: 25 } }),
      'https://pokeapi.co/api/v2/pokemon/25/',
      'URL'
    )
  })

  await check('query params explícitos', () => {
    assertEqual(
      buildApiUrl('dummyjson', 'products', { query: { limit: 3, skip: 10 } }),
      'https://dummyjson.com/products?limit=3&skip=10',
      'URL'
    )
  })

  await check('query param booleano se convierte a string', () => {
    assertEqual(
      buildApiUrl('dummyjson', 'products', { query: { limit: 5, active: true } }),
      'https://dummyjson.com/products?limit=5&active=true',
      'URL'
    )
  })

  await check('defaultQueryParams se aplican solos', () => {
    assertEqual(
      buildApiUrl('jsonplaceholder', 'userPosts'),
      'https://jsonplaceholder.typicode.com/posts?_limit=10',
      'URL'
    )
  })

  await check('override de un defaultQueryParams', () => {
    assertEqual(
      buildApiUrl('jsonplaceholder', 'userPosts', { query: { _limit: 42 } }),
      'https://jsonplaceholder.typicode.com/posts?_limit=42',
      'URL'
    )
  })

  // El contrato de runtime acepta null para eliminar un default,
  // aunque los tipos de UrlOptions no lo declaren.
  await check('eliminar un defaultQueryParams con null', () => {
    assertEqual(
      buildApiUrl('dummyjson', 'products', { query: { limit: null as unknown as number } }),
      'https://dummyjson.com/products',
      'URL'
    )
  })

  await check('params y query combinados', () => {
    assertEqual(
      buildApiUrl('dummyjson', 'postComments', {
        params: { postId: 3 },
        query: { limit: 2 },
      }),
      'https://dummyjson.com/comments/post/3?limit=2',
      'URL'
    )
  })

  // Configuración ampliada con endpoints de prueba para casos exóticos.
  // initApis reemplaza el estado global, así que este cambio afecta
  // a las secciones siguientes sin romper las APIs de data/apis.json.
  initApis({
    ...apisJson,
    apiParametros: {
      baseUri: 'https://params.ejemplo.com',
      endpoints: {
        detalle: '/users/:userId/posts/:postId',
        repetido: '/x/:id/y/:id',
      },
    },
  } as Record<string, unknown>)

  await check('varios parámetros distintos en un mismo template', () => {
    assertEqual(
      buildApiUrl('apiParametros', 'detalle', { params: { userId: 3, postId: 9 } }),
      'https://params.ejemplo.com/users/3/posts/9',
      'URL'
    )
  })

  await check('un parámetro repetido se sustituye en todas las ocurrencias', () => {
    assertEqual(
      buildApiUrl('apiParametros', 'repetido', { params: { id: 5 } }),
      'https://params.ejemplo.com/x/5/y/5',
      'URL'
    )
  })

  // Comportamiento actual documentado: los placeholders sin valor
  // permanecen en la URL y no se lanza error.
  await check('parámetro faltante: el placeholder queda en la URL', () => {
    assertEqual(
      buildApiUrl('dummyjson', 'productById'),
      'https://dummyjson.com/products/:id',
      'URL'
    )
  })

  await check('error: API desconocida lista las disponibles', () => {
    try {
      buildApiUrl('noExiste', 'products')
      throw new Error('no lanzó excepción')
    } catch (err) {
      assert(err instanceof Error, 'no es un Error')
      assert(err.message.includes('API "noExiste" not found'), 'mensaje inesperado')
      assert(err.message.includes('dummyjson'), 'no lista las APIs disponibles')
    }
  })

  await check('error: endpoint desconocido lista los disponibles', () => {
    try {
      buildApiUrl('dummyjson', 'noExiste')
      throw new Error('no lanzó excepción')
    } catch (err) {
      assert(err instanceof Error, 'no es un Error')
      assert(
        err.message.includes('Endpoint "noExiste" not found in "dummyjson"'),
        'mensaje inesperado'
      )
      assert(err.message.includes('productById'), 'no lista los endpoints disponibles')
    }
  })

  section('3. Peticiones HTTP reales: fetchApi contra dummyjson.com')

  await check('GET products con limit=5 por defecto', async () => {
    const res = await fetchApi<ProductsResponse>('dummyjson', 'products')
    assertEqual(res.status, 200, 'status')
    assert(res.ok, 'ok debe ser true')
    assert(res.url.includes('limit=5'), 'la URL no lleva el default limit=5')
    assert(Array.isArray(res.data.products), 'products no es un array')
    assert(res.data.products.length <= 5, 'products excede el limit')
    assertEqual(res.data.limit, 5, 'limit en la respuesta')
    assert(res.data.total > 100, 'total inesperado')
    await sleep(200)
  })

  await check('GET productById con parámetro de ruta', async () => {
    const res = await fetchApi<Product>('dummyjson', 'productById', { params: { id: 1 } })
    assertEqual(res.data.id, 1, 'id del producto')
    assert(typeof res.data.title === 'string', 'title no es string')
    assert(typeof res.data.price === 'number', 'price no es number')
    assert(res.url.endsWith('/products/1'), 'URL inesperada')
    await sleep(200)
  })

  await check('GET productSearch con query param q', async () => {
    const res = await fetchApi<ProductsResponse>('dummyjson', 'productSearch', {
      query: { q: 'phone' },
    })
    assert(res.data.products.length > 0, 'la búsqueda no devolvió resultados')
    assert(res.data.products.every((p) => typeof p.title === 'string'), 'título inválido')
    await sleep(200)
  })

  await check('GET productCategories devuelve un array de strings', async () => {
    const res = await fetchApi<string[]>('dummyjson', 'productCategories')
    assert(Array.isArray(res.data), 'data no es un array')
    assert(res.data.includes('smartphones'), 'falta la categoría smartphones')
    await sleep(200)
  })

  await check('GET productByCategory con parámetro de ruta', async () => {
    const res = await fetchApi<ProductsResponse>('dummyjson', 'productByCategory', {
      params: { category: 'smartphones' },
    })
    assert(res.data.products.length > 0, 'la categoría no devolvió productos')
    await sleep(200)
  })

  await check('GET users con limit=5 por defecto', async () => {
    const res = await fetchApi<UsersResponse>('dummyjson', 'users')
    assert(Array.isArray(res.data.users), 'users no es un array')
    assert(res.data.users.length <= 5, 'users excede el limit')
    assertEqual(res.data.limit, 5, 'limit en la respuesta')
    await sleep(200)
  })

  await check('GET userById', async () => {
    const res = await fetchApi<User>('dummyjson', 'userById', { params: { id: 1 } })
    assertEqual(res.data.id, 1, 'id del usuario')
    assert(typeof res.data.firstName === 'string', 'firstName no es string')
    assert(res.data.email.includes('@'), 'email inválido')
    await sleep(200)
  })

  await check('GET posts con limit=5 por defecto', async () => {
    const res = await fetchApi<PostsResponse>('dummyjson', 'posts')
    assert(Array.isArray(res.data.posts), 'posts no es un array')
    assert(res.data.posts.length <= 5, 'posts excede el limit')
    assertEqual(res.data.limit, 5, 'limit en la respuesta')
    await sleep(200)
  })

  await check('GET postById', async () => {
    const res = await fetchApi<Post>('dummyjson', 'postById', { params: { id: 1 } })
    assertEqual(res.data.id, 1, 'id del post')
    assert(typeof res.data.title === 'string', 'title no es string')
    assert(typeof res.data.body === 'string', 'body no es string')
    await sleep(200)
  })

  await check('GET postComments con :postId en el path', async () => {
    const res = await fetchApi<CommentsResponse>('dummyjson', 'postComments', {
      params: { postId: 1 },
    })
    assert(res.data.comments.length > 0, 'no hay comentarios')
    assert(
      res.data.comments.every((c) => c.postId === 1),
      'algún comentario no pertenece al post 1'
    )
    await sleep(200)
  })

  await check('GET todos con limit=5 por defecto', async () => {
    const res = await fetchApi<TodosResponse>('dummyjson', 'todos')
    assert(Array.isArray(res.data.todos), 'todos no es un array')
    assert(res.data.todos.length <= 5, 'todos excede el limit')
    assert(
      res.data.todos.every((t) => typeof t.completed === 'boolean'),
      'completed no es boolean'
    )
    await sleep(200)
  })

  await check('GET todoById', async () => {
    const res = await fetchApi<Todo>('dummyjson', 'todoById', { params: { id: 1 } })
    assertEqual(res.data.id, 1, 'id del todo')
    assert(typeof res.data.todo === 'string', 'todo no es string')
    await sleep(200)
  })

  await check('GET quotes devuelve la lista completa', async () => {
    const res = await fetchApi<QuotesResponse>('dummyjson', 'quotes')
    assert(res.data.quotes.length > 0, 'no hay citas')
    assert(
      res.data.quotes.every((q) => typeof q.author === 'string'),
      'author no es string'
    )
    await sleep(200)
  })

  await check('GET quoteById', async () => {
    const res = await fetchApi<Quote>('dummyjson', 'quoteById', { params: { id: 1 } })
    assertEqual(res.data.id, 1, 'id de la cita')
    assert(typeof res.data.quote === 'string', 'quote no es string')
    assert(typeof res.data.author === 'string', 'author no es string')
    await sleep(200)
  })

  await check('cabeceras personalizadas viajan en la petición', async () => {
    const res = await fetchApi<ProductsResponse>('dummyjson', 'products', {
      headers: { 'User-Agent': 'apis-manager-demo', Accept: 'application/json' },
    })
    assertEqual(res.status, 200, 'status')
    assert(res.ok, 'ok debe ser true')
    await sleep(200)
  })

  await check('respuesta no exitosa lanza API Error con el status', async () => {
    try {
      await fetchApi('dummyjson', 'productById', { params: { id: 999999 } })
      throw new Error('no lanzó excepción')
    } catch (err) {
      assert(err instanceof Error, 'no es un Error')
      assert(err.message.includes('API Error'), 'falta el prefijo API Error')
      assert(err.message.includes('404'), 'falta el código de estado')
    }
    await sleep(200)
  })

  // POST valida que el resto de opciones de FetchOptions
  // (method, headers, body) se pasan tal cual a fetch.
  // dummyjson responde 201 Created, y fetchApi lo acepta
  // porque res.ok cubre todo el rango 2xx.
  await check('POST con body y Content-Type', async () => {
    const res = await fetchApi<{ id: number; title: string }>('dummyjson', 'addProduct', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Producto de prueba' }),
    })
    assertEqual(res.status, 201, 'status')
    assert(res.ok, 'ok debe ser true')
    assertEqual(res.data.title, 'Producto de prueba', 'title')
    assert(typeof res.data.id === 'number', 'id no es number')
    await sleep(200)
  })

  section('4. Hook de React: useApiUrl')

  function EnlaceProducto({ id }: { id: number }) {
    const url = useApiUrl('dummyjson', 'productById', { params: { id } })
    return createElement('a', { href: url }, `Ver producto ${id}`)
  }

  function ListaProductos() {
    const url = useApiUrl('dummyjson', 'products')
    return createElement('a', { href: url }, 'Productos')
  }

  await check('el hook construye la URL con parámetros de ruta', () => {
    const html = renderToStaticMarkup(createElement(EnlaceProducto, { id: 7 }))
    assertEqual(
      html,
      '<a href="https://dummyjson.com/products/7">Ver producto 7</a>',
      'HTML renderizado'
    )
  })

  await check('el hook aplica los defaultQueryParams del endpoint', () => {
    const html = renderToStaticMarkup(createElement(ListaProductos))
    assertEqual(
      html,
      '<a href="https://dummyjson.com/products?limit=5">Productos</a>',
      'HTML renderizado'
    )
  })

  await check('el hook refleja cambios en las props', () => {
    const html = renderToStaticMarkup(createElement(EnlaceProducto, { id: 8 }))
    assert(html.includes('products/8'), 'el HTML no contiene products/8')
  })

  section('5. API pública: index.ts')

  await check('index reexporta las 5 funciones públicas', () => {
    assertEqual(typeof lib.initApis, 'function', 'initApis')
    assertEqual(typeof lib.getApis, 'function', 'getApis')
    assertEqual(typeof lib.buildApiUrl, 'function', 'buildApiUrl')
    assertEqual(typeof lib.fetchApi, 'function', 'fetchApi')
    assertEqual(typeof lib.useApiUrl, 'function', 'useApiUrl')
  })

  // Los tipos (ApiEntry, ApisConfig, UrlOptions, FetchOptions y
  // FetchResult) se verifican en compilación; en runtime se comprueba
  // que las funciones llegan funcionales vía el barrel.
  await check('las funciones llegan funcionales vía index', () => {
    assertEqual(
      lib.buildApiUrl('dummyjson', 'products'),
      'https://dummyjson.com/products?limit=5',
      'URL'
    )
  })

  section('Resumen')

  const total = passed + failed
  console.log(`  Pruebas: ${total} | Pasadas: ${passed} | Falladas: ${failed}`)
  if (failed > 0) {
    console.log('  ❌ Hay pruebas falladas')
    process.exit(1)
  }
  console.log('  ✅ Todas las pruebas pasaron')
}

main().catch((err) => {
  console.error('Error fatal en demo.ts:', err)
  process.exit(1)
})

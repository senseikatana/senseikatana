/**
 * demo.js — Uso de apis-manager con JavaScript puro.
 *
 * La idea de la librería: data/apis.json aporta la baseUri y los endpoints,
 * y el código los consume con destructuring y constantes nombradas,
 * sin strings mágicos repetidos.
 *
 * Ejecútalo con:
 *
 *   bun run src/demo.js
 */

import apisJson from '../data/apis.json'
import { initApis, getApis, buildApiUrl, fetchApi } from './core'

// 1. Cargar el JSON. initApis lo normaliza y deja la config disponible.
initApis(apisJson)

// 2. Destructuring: baseUri y endpoints salen del JSON ya normalizado.
const { dummyjson } = getApis()
const { baseUri, endpoints } = dummyjson
const { products, productById, productSearch, addProduct } = endpoints

// 3. Constantes nombradas: un único punto de verdad para los
//    identificadores que reciben buildApiUrl y fetchApi.
const DUMMYJSON = 'dummyjson'
const PRODUCTS = 'products'
const PRODUCT_BY_ID = 'productById'
const PRODUCT_SEARCH = 'productSearch'
const ADD_PRODUCT = 'addProduct'

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function main() {
  console.log('baseUri leída del JSON:', baseUri)
  console.log('')
  console.log('Plantillas del JSON:')
  console.log('  productos:', baseUri + products)
  console.log('  producto por id:', baseUri + productById)
  console.log('  búsqueda:', baseUri + productSearch)
  console.log('  crear producto:', baseUri + addProduct)
  console.log('')

  // La librería resuelve los :params de la plantilla.
  console.log(
    'URL resuelta:',
    buildApiUrl(DUMMYJSON, PRODUCT_BY_ID, { params: { id: 3 } })
  )
  console.log('')

  // Listado de productos. El JSON declara defaultQueryParams
  // (limit: 5), y fetchApi los aplica solo.
  const { data: listado, url: urlListado } = await fetchApi(DUMMYJSON, PRODUCTS)
  console.log(`Listado de productos (${urlListado})`)
  console.log(`  ${listado.products.length} de ${listado.total} productos`)
  for (const producto of listado.products.slice(0, 3)) {
    console.log(`  - ${producto.title} (${producto.price} USD)`)
  }
  console.log('')

  await sleep(200)

  // Producto por id con params de ruta.
  const { data: producto } = await fetchApi(DUMMYJSON, PRODUCT_BY_ID, {
    params: { id: 1 },
  })
  console.log('Producto 1:', producto.title, `(${producto.price} USD)`)
  console.log('')

  await sleep(200)

  // Búsqueda con query. El defaultQueryParams se combina con q.
  const { data: busqueda } = await fetchApi(DUMMYJSON, PRODUCT_SEARCH, {
    query: { q: 'laptop' },
  })
  console.log('Búsqueda "laptop":')
  for (const producto of busqueda.products.slice(0, 3)) {
    console.log(`  - ${producto.title} (${producto.price} USD)`)
  }
  console.log('')

  await sleep(200)

  // POST: crear un producto nuevo.
  const { data: creado, status } = await fetchApi(DUMMYJSON, ADD_PRODUCT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'Producto desde demo.js' }),
  })
  console.log(`POST ${status}: creado el producto ${creado.id}, ${creado.title}`)
  console.log('')

  // Error: un id que no existe lanza API Error, y lo capturamos.
  try {
    await fetchApi(DUMMYJSON, PRODUCT_BY_ID, { params: { id: 99999 } })
  } catch (error) {
    console.log('Capturado en 404:', error.message)
  }
}

main().catch((error) => {
  console.error('Error en demo.js:', error)
  process.exit(1)
})

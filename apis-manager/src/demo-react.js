/**
 * demo-react.js — Uso de apis-manager con React.
 *
 * Misma filosofía que demo.js: baseUri y endpoints salen de data/apis.json
 * y se consumen con destructuring y constantes nombradas. Los
 * componentes usan useApiUrl para construir sus URLs.
 *
 * Se renderiza con react-dom/server para poder ejecutarlo desde la
 * terminal, sin dev server:
 *
 *   bun run src/demo-react.js
 */

import { renderToStaticMarkup } from 'react-dom/server'

import apisJson from '../data/apis.json'
import { initApis, getApis, fetchApi } from './core'
import { useApiUrl } from './react'

// 1. Cargar el JSON.
initApis(apisJson)

// 2. Destructuring: baseUri y endpoints del JSON normalizado.
const { dummyjson } = getApis()
const { baseUri } = dummyjson
const { products, productById } = dummyjson.endpoints

// 3. Constantes nombradas para los identificadores.
const DUMMYJSON = 'dummyjson'
const PRODUCTS = 'products'
const PRODUCT_BY_ID = 'productById'

function TarjetaProducto({ id }) {
  const url = useApiUrl(DUMMYJSON, PRODUCT_BY_ID, { params: { id } })
  return (
    <article>
      <h2>Producto {id}</h2>
      <a href={url}>Ver el producto {id} en dummyjson</a>
    </article>
  )
}

function ListaProductos() {
  const url = useApiUrl(DUMMYJSON, PRODUCTS)
  return <a href={url}>Ver el listado de productos</a>
}

async function main() {
  console.log('baseUri leída del JSON:', baseUri)
  console.log('Plantilla del listado:', baseUri + products)
  console.log('Plantilla del producto por id:', baseUri + productById)
  console.log('')

  console.log('TarjetaProducto con id 7 renderizada:')
  console.log(renderToStaticMarkup(<TarjetaProducto id={7} />))
  console.log('')

  console.log('ListaProductos renderizada:')
  console.log(renderToStaticMarkup(<ListaProductos />))
  console.log('')

  // Flujo de datos con fetchApi y las mismas constantes.
  const { data, url } = await fetchApi(DUMMYJSON, PRODUCT_BY_ID, {
    params: { id: 7 },
  })
  console.log(`Datos reales de ${url}`)
  console.log(`  ${data.title} (${data.price} USD)`)
}

main().catch((error) => {
  console.error('Error en demo-react.js:', error)
  process.exit(1)
})

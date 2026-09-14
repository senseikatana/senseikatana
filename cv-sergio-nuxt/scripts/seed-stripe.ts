/**
 * Seed de Stripe — crea Products y Prices en tu cuenta de Stripe
 * a partir del catálogo digital de data/products.ts.
 *
 * Uso:
 *   bun run seed:stripe             # crear productos + precios (no toca archivos)
 *   bun run seed:stripe --update    # además, reescribe data/products.ts con los price IDs reales
 *
 * Idempotente: si ya existe un Product/Price con la misma metadata `app_id`,
 * lo reutiliza en vez de duplicarlo.
 *
 * Los productos con `externalUrl` (Wallapop, Vinted, etc.) se ignoran:
 * no se venden por Stripe.
 */
import Stripe from 'stripe'
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { products } from '../data/products'
import type { Product } from '../data/products'

const DATA_FILE = fileURLToPath(new URL('../data/products.ts', import.meta.url))
const API_VERSION = '2024-12-18.acacia' as Stripe.LatestApiVersion

/** Carga .env manualmente (tsx no lo hace solo) sin pisar variables ya definidas. */
function loadEnvFile() {
  try {
    const envFile = fileURLToPath(new URL('../.env', import.meta.url))
    const content = readFileSync(envFile, 'utf8')
    for (const line of content.split('\n')) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/)
      if (match && !process.env[match[1]]) {
        process.env[match[1]] = match[2].replace(/^["']|["']$/g, '')
      }
    }
  } catch {
    // .env no existe; se usan las variables del entorno
  }
}

async function findOrCreateProduct(stripe: Stripe, product: Product) {
  const existing = await stripe.products.list({ limit: 100, active: true })
  const found = existing.data.find(p => p.metadata.app_id === product.id)
  if (found) return found

  return stripe.products.create({
    name: product.name,
    description: product.description,
    metadata: { app_id: product.id },
  })
}

async function findOrCreatePrice(stripe: Stripe, spProduct: Stripe.Product, product: Product) {
  const existing = await stripe.prices.list({ product: spProduct.id, limit: 100, active: true })
  const found = existing.data.find(p => p.metadata.app_id === product.id)
  if (found) return found

  return stripe.prices.create({
    product: spProduct.id,
    unit_amount: Math.round(product.price * 100),
    currency: product.currency.toLowerCase(),
    metadata: { app_id: product.id },
  })
}

async function main() {
  loadEnvFile()

  const args = process.argv.slice(2)
  const update = args.includes('--update')

  const apiKey = process.env.STRIPE_SECRET_KEY
  if (!apiKey || apiKey.includes('...')) {
    console.error('\nSTRIPE_SECRET_KEY no está configurada.')
    console.error('Copiá .env.example a .env y agregá tu clave de Stripe (sk_test_... o sk_live_...).\n')
    process.exit(1)
  }

  const stripe = new Stripe(apiKey, { apiVersion: API_VERSION })

  const digital = products.filter(p => !p.externalUrl)
  const external = products.filter(p => p.externalUrl)

  console.log(`Catálogo: ${products.length} productos (${digital.length} digitales / ${external.length} externos)\n`)

  if (digital.length === 0) {
    console.log('No hay productos digitales configurados (todos tienen externalUrl).')
    console.log('Cuando agregues un producto sin externalUrl, corré este seed de nuevo.')
    return
  }

  const priceIds = new Map<string, string>()
  for (const product of digital) {
    const spProduct = await findOrCreateProduct(stripe, product)
    const price = await findOrCreatePrice(stripe, spProduct, product)

    priceIds.set(product.slug, price.id)
    const created = product.stripePriceId !== price.id
    console.log(`${created ? '✓ creado' : '• ya existía'}  ${product.name} → ${price.id}`)
  }

  if (update && priceIds.size > 0) {
    let content = readFileSync(DATA_FILE, 'utf8')
    let changes = 0
    for (const [slug, priceId] of priceIds) {
      const product = digital.find(p => p.slug === slug)
      if (!product || product.stripePriceId === priceId) continue
      content = content.replace(`stripePriceId: '${product.stripePriceId}'`, `stripePriceId: '${priceId}'`)
      changes++
    }
    if (changes > 0) {
      writeFileSync(DATA_FILE, content)
      console.log(`\n✓ data/products.ts actualizado (${changes} price ID${changes > 1 ? 's' : ''})`)
      console.log('Revisá el diff con git diff antes de commitear.')
    }
  }

  console.log('\nListo.')
}

main()
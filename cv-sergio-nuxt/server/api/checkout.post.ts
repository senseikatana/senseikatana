import Stripe from 'stripe'
import { products } from '~~/data/products'

const MAX_QUANTITY = 10

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  if (!config.stripeSecretKey) {
    throw createError({ statusCode: 500, message: 'Stripe not configured' })
  }

  const body = await readBody(event).catch(() => null)
  const rawItems = Array.isArray(body?.items) ? body.items : []
  if (rawItems.length === 0) {
    throw createError({ statusCode: 400, message: 'No items provided' })
  }

  // Validar y normalizar la entrada. El servidor decide qué se cobra,
  // nunca el cliente.
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = []
  for (const raw of rawItems) {
    const quantity = Number(raw?.quantity)

    // Solo aceptar priceIds que existan en nuestro catálogo
    const product = products.find(p => p.stripePriceId === raw?.priceId)
    if (!product) {
      throw createError({ statusCode: 400, message: `Invalid priceId: ${raw?.priceId}` })
    }

    // Evitar cantidades negativas, cero o descomunales
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY) {
      throw createError({ statusCode: 400, message: 'Invalid quantity' })
    }

    lineItems.push({ price: product.stripePriceId, quantity })
  }

  const stripe = new Stripe(config.stripeSecretKey, {
    apiVersion: '2024-12-18.acacia',
  })

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${config.public.siteUrl}/store/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${config.public.siteUrl}/store`,
    })

    return { url: session.url }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error creating checkout session'
    throw createError({ statusCode: 500, message })
  }
})

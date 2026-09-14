import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  if (!config.stripeSecretKey || !config.stripeWebhookSecret) {
    throw createError({ statusCode: 500, message: 'Stripe not configured' })
  }

  const stripe = new Stripe(config.stripeSecretKey, {
    apiVersion: '2024-12-18.acacia',
  })

  const signature = getHeader(event, 'stripe-signature')
  if (!signature) {
    throw createError({ statusCode: 400, message: 'Missing stripe-signature header' })
  }

  // Verificar la firma para descartar peticiones falsas (la URL de success
  // es públicamente falsificable; solo el webhook firma la verdad).
  let eventParsed: Stripe.Event
  try {
    const rawBody = await readRawBody(event)
    if (!rawBody) {
      throw createError({ statusCode: 400, message: 'Missing body' })
    }
    eventParsed = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      config.stripeWebhookSecret,
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Invalid signature'
    throw createError({ statusCode: 400, message })
  }

  // Manejar eventos relevantes
  switch (eventParsed.type) {
    case 'checkout.session.completed': {
      const session = eventParsed.data.object as Stripe.Checkout.Session
      // Aquí va la lógica de entrega/derechos del producto:
      // - Marcar la compra como pagada
      // - Enviar email con el recurso digital
      // - Crear el acceso al curso, etc.
      console.log('Payment completed for session', session.id, 'amount_total:', session.amount_total)
      break
    }
    case 'checkout.session.expired': {
      console.log('Session expired', eventParsed.data.object.id)
      break
    }
  }

  return { received: true }
})

import type { APIRoute } from 'astro';
import { stripe } from './stripe-service';

/**
 * POST /api/stripe/webhook
 * Recibe eventos en tiempo real desde Stripe (pagos completados, fallidos, etc.)
 */
export const POST: APIRoute = async ({ request }) => {
  const signature = request.headers.get('stripe-signature');
  const webhookSecret = import.meta.env.STRIPE_WEBHOOK_SECRET || process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return new Response('Webhook secret o firma ausente', { status: 400 });
  }

  try {
    // Para verificar la firma, Stripe necesita el body crudo (raw string)
    const rawBody = await request.text();
    
    const event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);

    // Manejamos los diferentes tipos de eventos
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        console.log(`✅ Pago exitoso para la sesión: ${session.id}`);
        
        // AQUÍ LÓGICA DE NEGOCIO:
        // 1. Guardar el pedido en tu base de datos (PostgreSQL, MongoDB, etc.)
        // 2. Enviar email de confirmación al cliente
        // 3. Descontar stock
        
        break;
      }
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        console.log(`❌ Pago fallido: ${paymentIntent.last_payment_error?.message}`);
        break;
      }
      // Puedes añadir más casos según lo necesites (ej: devoluciones)
      default:
        console.log(`Evento no manejado: ${event.type}`);
    }

    // Hay que devolver un 200 OK a Stripe para confirmar que recibimos el evento
    return new Response(JSON.stringify({ received: true }), { status: 200 });
    
  } catch (err: any) {
    console.error(`⚠️ Error de firma Webhook.`, err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }
};

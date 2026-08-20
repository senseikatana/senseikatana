export const prerender = false; // Forzar que esta ruta sea SSR

import type { APIRoute } from 'astro';
import Stripe from 'stripe';

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export const POST: APIRoute = async ({ request, url }) => {
  try {
    const { items, customerEmail, shippingMethod } = await request.json();

    if (!items || items.length === 0) {
      return new Response(JSON.stringify({ error: 'El carrito está vacío' }), { status: 400 });
    }

    // Mapear los productos al formato requerido por Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.title,
          description: `Talla: ${item.size} | Color: ${item.color}`,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100), // En céntimos
      },
      quantity: item.quantity,
    }));

    // Configurar opciones de entrega en base al método de envío
    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer_email: customerEmail,
      success_url: `${url.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${url.origin}/#coleccion`,
      metadata: {
        shippingMethod, // "collect" (Cambrils) o "shipment" (Envío)
      }
    };

    // Si es envío a domicilio, requerir la dirección postal
    if (shippingMethod === 'shipment') {
      sessionConfig.shipping_address_collection = {
        allowed_countries: ['ES'], // Envíos solo a España
      };
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error en Stripe Checkout:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

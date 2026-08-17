import type { APIRoute } from 'astro';
import { createCheckout } from './stripe-service';

/**
 * POST /api/stripe/checkout
 * Genera la URL de la sesión de pago y redirige al usuario o devuelve la URL
 */
export const POST: APIRoute = async ({ request, url }) => {
  try {
    const body = await request.json();
    const items = body.items; // Array de items del carrito

    if (!items || items.length === 0) {
      return new Response(JSON.stringify({ error: 'El carrito está vacío' }), { status: 400 });
    }

    // Mapeamos los items del frontend al formato que requiere Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100), // Convertimos a centavos (ej: 19.95 -> 1995)
      },
      quantity: item.quantity || 1,
    }));

    // Pasamos el origen de la URL (ej: http://localhost:4321 o https://numperfume.com)
    const origin = url.origin;
    
    const session = await createCheckout(lineItems, origin);

    // Devolvemos la URL para que el frontend redirija al usuario a la pasarela
    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error creando checkout session:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

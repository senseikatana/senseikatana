import type { APIRoute } from 'astro';
import { getActiveProducts, createProductWithPrice } from './stripe-service';

/**
 * GET /api/stripe/products
 * Devuelve la lista de productos de Stripe
 */
export const GET: APIRoute = async () => {
  try {
    const products = await getActiveProducts();
    
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

/**
 * POST /api/stripe/products
 * Crea un producto nuevo de forma programática
 * * Ejemplo de Body:
 * { "name": "NUM 012", "description": "Inspiración Baccarat", "priceInCents": 1995 }
 */
export const POST: APIRoute = async ({ request }) => {
  try {
    // Seguridad básica: Podrías añadir un header de autorización aquí para evitar que 
    // cualquiera cree productos en tu cuenta de Stripe.
    
    const body = await request.json();
    
    if (!body.name || !body.priceInCents) {
      return new Response(JSON.stringify({ error: 'Faltan campos obligatorios (name, priceInCents)' }), { status: 400 });
    }

    const newProduct = await createProductWithPrice(body);

    return new Response(JSON.stringify(newProduct), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

import type { APIRoute } from 'astro';
import Stripe from 'stripe';

export const POST: APIRoute = async ({ request }) => {
  try {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      return new Response(JSON.stringify({ error: "STRIPE_SECRET_KEY environment variable is required" }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const stripe = new Stripe(key, { apiVersion: "2025-02-24.acacia" });
    const { items } = await request.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.APP_URL || "http://localhost:3000"}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.APP_URL || "http://localhost:3000"}/cart`,
      shipping_address_collection: {
        allowed_countries: ["ES", "PT", "FR", "IT"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 399, currency: "eur" },
            display_name: "Envío Estándar (InPost / Correos)",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 2 },
              maximum: { unit: "business_day", value: 5 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 599, currency: "eur" },
            display_name: "Envío Exprés",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 1 },
              maximum: { unit: "business_day", value: 2 },
            },
          },
        },
      ],
    });

    return new Response(JSON.stringify({ id: session.id, url: session.url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error("Stripe error:", error);
    return new Response(JSON.stringify({ error: error.message || "Error al procesar el pago" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

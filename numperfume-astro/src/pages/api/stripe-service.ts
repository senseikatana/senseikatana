import Stripe from 'stripe';

// Inicializamos Stripe con la clave secreta
// Nota: En Astro es recomendable usar import.meta.env, pero process.env también funciona en entornos Bun/Node.
const stripeSecretKey = import.meta.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.warn('⚠️ No se ha encontrado STRIPE_SECRET_KEY en las variables de entorno.');
}

export const stripe = new Stripe(stripeSecretKey as string, {
  apiVersion: '2023-10-16', // Usa la versión de la API que prefieras o la actual
  appInfo: {
    name: 'NUM Perfume',
    version: '1.0.0',
  },
});

/**
 * Obtiene todos los productos activos de Stripe junto con sus precios predeterminados
 */
export async function getActiveProducts() {
  const products = await stripe.products.list({
    active: true,
    expand: ['data.default_price'], // Expande el precio para obtener el importe en la misma llamada
  });
  return products.data;
}

/**
 * Crea un nuevo producto en Stripe junto con su precio.
 * Ideal para sincronizar tu catálogo local con Stripe de forma programática.
 */
export async function createProductWithPrice(data: {
  name: string;
  description: string;
  priceInCents: number;
  imageUrl?: string;
}) {
  const product = await stripe.products.create({
    name: data.name,
    description: data.description,
    images: data.imageUrl ? [data.imageUrl] : undefined,
    default_price_data: {
      currency: 'eur',
      unit_amount: data.priceInCents, // Stripe maneja los precios en centavos (ej: 1995 para 19,95€)
    },
  });

  return product;
}

/**
 * Crea una sesión de Checkout de Stripe para el carrito de compras
 */
export async function createCheckout(lineItems: Stripe.Checkout.SessionCreateParams.LineItem[], origin: string) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card', 'paypal', 'klarna'], // Añade los métodos de pago que tengas activados en tu dashboard
    line_items: lineItems,
    mode: 'payment',
    billing_address_collection: 'required',
    shipping_address_collection: {
      allowed_countries: ['ES', 'PT', 'FR', 'IT', 'DE'], // Países de envío permitidos
    },
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/carrito`,
  });

  return session;
}

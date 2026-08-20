import { createProductWithPrice } from '../pages/api/stripe-service';

// 1. Aquí colocas tus mockups (con tus types si los tienes importados)
const mockProducts = [
  {
    id: "num-012",
    name: "NUM 012 (50ml)",
    description: "Perfume de equivalencia - Inspiración en Baccarat Rouge 540",
    price: 19.95, // Precio en Euros
    imageUrl: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "num-045",
    name: "NUM 045 (50ml)",
    description: "Perfume de equivalencia - Inspiración en Black Opium",
    price: 16.95,
    imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "num-088",
    name: "NUM 088 (50ml)",
    description: "Perfume de equivalencia - Inspiración en Aventus Creed",
    price: 19.95,
    imageUrl: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=600&q=80"
  }
];

async function seedProductsToStripe() {
  console.log('🚀 Iniciando la subida de productos a Stripe...');

  for (const product of mockProducts) {
    try {
      console.log(`Subiendo: ${product.name}...`);
      
      // Llamamos a la función que creamos en backend/stripe.ts
      const stripeProduct = await createProductWithPrice({
        name: product.name,
        description: product.description,
        // Stripe requiere el precio en centavos (ej: 19.95€ -> 1995)
        priceInCents: Math.round(product.price * 100), 
        imageUrl: product.imageUrl
      });

      console.log(`✅ Producto creado exitosamente! ID en Stripe: ${stripeProduct.id}`);
    } catch (error) {
      console.error(`❌ Error al subir ${product.name}:`, error);
    }
  }

  console.log('🎉 Proceso de sincronización completado.');
}

// Ejecutar la función
seedProductsToStripe();

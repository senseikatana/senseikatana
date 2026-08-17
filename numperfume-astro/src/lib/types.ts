// Definiciones de tipos para la lógica de negocio y pagos

export interface ProductInput {
  name: string;
  description: string;
  priceInCents: number;
  imageUrl?: string;
}

export interface CartItem {
  id?: string;
  name: string;
  price: number; // Precio en formato decimal (ej: 19.95)
  quantity: number;
  image?: string;
}

export interface CheckoutSessionParams {
  lineItems: CartItem[];
  origin: string; // La URL base de tu web (ej: https://numperfume.com)
}

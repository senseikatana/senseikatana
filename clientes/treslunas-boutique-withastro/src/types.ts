export type PageView = 
  | 'home' 
  | 'catalog' 
  | 'product-detail' 
  | 'cart' 
  | 'checkout' 
  | 'about' 
  | 'contact' 
  | 'branding-guide' 
  | '404';

export type Category = 'Todos' | 'Vestidos' | 'Top & Blusas' | 'Pantalones' | 'Accesorios' | 'Joyería';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  originalPrice?: number;
  description: string;
  adviceFromErika?: string;
  images: string[];
  colors: { name: string; hex: string; bgClass: string }[];
  sizes: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  featured?: boolean;
  completeTheLookIds?: string[];
}

export interface CartItem {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export interface ShippingDetails {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  email: string;
  phone: string;
  shippingOption: 'local' | 'standard' | 'express';
}

export type PaymentMethod = 'card' | 'paypal' | 'bizum' | 'applepay' | 'gpay' | 'klarna';

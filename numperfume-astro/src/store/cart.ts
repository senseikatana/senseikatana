import { atom } from 'nanostores';

export interface ProductSize {
  size: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  sizes: ProductSize[];
  image: string;
  category: string;
  notes: string[];
}

export interface CartItem extends Product {
  cartItemId: string; // Unique ID for cart item (id + size)
  selectedSize: string;
  price: number; // Price for the selected size
  quantity: number;
}

// Initialize from localStorage if available
const isBrowser = typeof window !== 'undefined';
const initialCart = isBrowser ? JSON.parse(localStorage.getItem('numperfumes-cart') || '[]') : [];

export const cartItems = atom<CartItem[]>(initialCart);

if (isBrowser) {
  cartItems.listen((items) => {
    localStorage.setItem('numperfumes-cart', JSON.stringify(items));
  });
}

export function addItem(product: Product, selectedSize: string, price: number) {
  const items = cartItems.get();
  const cartItemId = `${product.id}-${selectedSize}`;
  const existing = items.find(item => item.cartItemId === cartItemId);
  
  if (existing) {
    cartItems.set(items.map(item =>
      item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  } else {
    cartItems.set([...items, { ...product, cartItemId, selectedSize, price, quantity: 1 }]);
  }
}

export function removeItem(cartItemId: string) {
  cartItems.set(cartItems.get().filter(item => item.cartItemId !== cartItemId));
}

export function updateQuantity(cartItemId: string, quantity: number) {
  if (quantity < 1) return removeItem(cartItemId);
  cartItems.set(cartItems.get().map(item =>
    item.cartItemId === cartItemId ? { ...item, quantity } : item
  ));
}

export function clearCart() {
  cartItems.set([]);
}

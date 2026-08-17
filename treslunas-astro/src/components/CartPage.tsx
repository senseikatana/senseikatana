import React from 'react';
import { CartItem, PageView } from '../types';
import { Trash2, ShieldCheck, ArrowRight, Truck, ShoppingBag } from 'lucide-react';

interface CartPageProps {
  cart: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  setActivePage: (page: PageView) => void;
  isDarkMode: boolean;
}

export const CartPage: React.FC<CartPageProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  setActivePage,
  isDarkMode,
}) => {
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const isFreeLocalShipping = subtotal > 90 || subtotal === 0;

  return (
    <div className={`min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto transition-colors duration-300 ${
      isDarkMode ? 'bg-[#0f0f12] text-white' : 'bg-[#fcf9f8] text-[#1c1b1b]'
    }`}>
      <div className="text-center mb-10">
        <span className="text-xs font-montserrat font-bold uppercase tracking-[0.3em] text-[#92003a] dark:text-pink-400">
          3 LUNAS BOUTIQUE
        </span>
        <h1 className="font-serif-chic font-bold text-3xl sm:text-4xl mt-1">
          3 Lunas Shopping Cart
        </h1>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-20 border border-neutral-800/40 rounded-xl max-w-md mx-auto space-y-4">
          <ShoppingBag className="w-12 h-12 text-neutral-500 mx-auto" />
          <h2 className="font-serif-chic font-bold text-xl">Tu cesta está vacía</h2>
          <p className="text-xs text-neutral-400">Descubre nuestra colección exclusiva de prendas y accesorios.</p>
          <button
            onClick={() => setActivePage('catalog')}
            className="px-8 py-3 bg-[#92003a] hover:bg-[#F62477] text-white rounded font-montserrat font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            IR A LA COLECCIÓN
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Express Checkout & Cart Items */}
          <div className="lg:col-span-7 space-y-6">
            <div className={`p-6 rounded-xl border space-y-4 ${
              isDarkMode ? 'bg-[#15151a] border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'
            }`}>
              {/* Express Checkout Header */}
              <div className="text-center relative">
                <span className="text-xs font-montserrat font-semibold text-neutral-400 bg-transparent px-3">
                  Express Checkout
                </span>
                <div className="h-px bg-neutral-700/30 w-full absolute top-2.5 -z-10" />
              </div>

              {/* Express Payment Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setActivePage('checkout')}
                  className="py-3 px-4 bg-white text-black font-bold rounded flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors cursor-pointer shadow"
                >
                  <span className="font-bold text-base"><span className="text-blue-500">G</span> Pay</span>
                </button>
                <button
                  onClick={() => setActivePage('checkout')}
                  className="py-3 px-4 bg-black text-white font-bold rounded flex items-center justify-center gap-2 hover:bg-neutral-900 transition-colors cursor-pointer border border-neutral-700 shadow"
                >
                  <span className="font-bold text-base"> Pay</span>
                </button>
              </div>

              {/* Items List */}
              <div className="divide-y divide-neutral-800/40 pt-4 space-y-4">
                {cart.map((item, idx) => (
                  <div key={idx} className="pt-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-24 object-cover rounded bg-neutral-800"
                      />
                      <div className="space-y-1">
                        <h3 className="font-serif-chic font-bold text-base">{item.product.name}</h3>
                        <p className="text-xs text-neutral-400">
                          Color: {item.selectedColor} | Size: {item.selectedSize}
                        </p>
                        <p className="font-montserrat font-bold text-[#92003a] dark:text-pink-400 text-sm">
                          Price: {item.product.price.toFixed(2)} €
                        </p>
                      </div>
                    </div>

                    {/* Quantity & Delete */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-neutral-700 rounded bg-neutral-900/50">
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                          className="px-2.5 py-1 text-sm font-bold text-neutral-400 hover:text-white cursor-pointer"
                        >
                          −
                        </button>
                        <span className="px-3 py-1 text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                          className="px-2.5 py-1 text-sm font-bold text-neutral-400 hover:text-white cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors cursor-pointer"
                        title="Eliminar artículo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Local Delivery */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`p-6 rounded-xl border space-y-5 ${
              isDarkMode ? 'bg-[#15151a] border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'
            }`}>
              {/* Local Delivery Yellow Highlight Box (Matching Image 2) */}
              <div className="bg-[#FFE185] text-neutral-900 rounded-lg p-3.5 flex items-center justify-between font-sans-body">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-neutral-900 shrink-0" />
                  <div>
                    <p className="font-montserrat font-bold text-xs uppercase">Local Delivery (Tarragona Area)</p>
                    <p className="text-[11px] opacity-80">Cambrils, Reus y Salou en 24h</p>
                  </div>
                </div>
                <div className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-bold">
                  ✓
                </div>
              </div>

              {/* Prices Calculation */}
              <div className="space-y-3 font-sans-body text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Subtotal</span>
                  <span className="font-montserrat font-bold text-base">{subtotal.toFixed(2)} €</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Shipping</span>
                  <span className="text-xs text-emerald-400 font-medium">
                    {isFreeLocalShipping ? 'Envío Gratis' : 'Calculated at next step'}
                  </span>
                </div>
                <div className="pt-3 border-t border-neutral-800 flex items-center justify-between font-montserrat font-bold text-lg">
                  <span>Total</span>
                  <span className="text-[#92003a] dark:text-pink-400">{subtotal.toFixed(2)} €</span>
                </div>
              </div>

              {/* Checkout CTA Button */}
              <button
                onClick={() => setActivePage('checkout')}
                className="w-full py-4 bg-[#92003a] hover:bg-[#F62477] text-white font-montserrat font-bold text-xs tracking-widest uppercase rounded transition-all shadow-berry-glow flex items-center justify-center gap-2 cursor-pointer"
              >
                FINALIZAR COMPRA <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-xs text-neutral-400 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

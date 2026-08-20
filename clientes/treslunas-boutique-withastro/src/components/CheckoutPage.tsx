import React, { useState } from 'react';
import { CartItem, ShippingDetails, PaymentMethod, PageView } from '../types';
import { ShieldCheck, CreditCard, CheckCircle2, Sparkles, ArrowLeft } from 'lucide-react';

interface CheckoutPageProps {
  cart: CartItem[];
  onClearCart: () => void;
  setActivePage: (page: PageView) => void;
  isDarkMode: boolean;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  cart,
  onClearCart,
  setActivePage,
  isDarkMode,
}) => {
  const [shipping, setShipping] = useState<ShippingDetails>({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    email: '',
    phone: '',
    shippingOption: 'local',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bizum');
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false);
  const [orderNumber, setOrderNumber] = useState<string>('');

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shipping.fullName || !shipping.email || !shipping.address) {
      alert('Por favor, completa los campos requeridos.');
      return;
    }

    const randomNum = '3L-' + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(randomNum);
    setOrderPlaced(true);
    onClearCart();
  };

  return (
    <div className={`min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto transition-colors duration-300 ${
      isDarkMode ? 'bg-[#0a0a0c] text-white' : 'bg-[#fcf9f8] text-[#1c1b1b]'
    }`}>
      {/* Back button */}
      <div className="mb-6">
        <button
          onClick={() => setActivePage('cart')}
          className="inline-flex items-center gap-2 text-xs font-montserrat font-bold text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> VOLVER A LA CESTA
        </button>
      </div>

      <div className="text-center mb-10">
        <span className="text-xs font-montserrat font-bold uppercase tracking-[0.3em] text-[#92003a] dark:text-pink-400">
          3 LUNAS BOUTIQUE
        </span>
        <h1 className="font-serif-chic font-bold text-3xl sm:text-4xl mt-1">
          3 Lunas Payment & Checkout
        </h1>
      </div>

      {orderPlaced ? (
        <div className={`p-8 sm:p-12 rounded-2xl border text-center max-w-xl mx-auto space-y-6 shadow-2xl ${
          isDarkMode ? 'bg-[#15151a] border-neutral-800' : 'bg-white border-neutral-200'
        }`}>
          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-montserrat font-bold uppercase tracking-widest text-emerald-400">
              ¡PEDIDO CONFIRMADO!
            </span>
            <h2 className="font-serif-chic font-bold text-3xl">Gracias por tu compra</h2>
            <p className="text-xs text-neutral-400">
              Número de Pedido: <span className="font-mono text-white font-bold">{orderNumber}</span>
            </p>
          </div>

          <p className="text-xs text-neutral-300 leading-relaxed font-sans-body">
            Hemos enviado un correo de confirmación a <span className="text-amber-300 font-bold">{shipping.email}</span>. Si seleccionaste recojo en tienda Cambrils, tu pedido estará listo en 2 horas.
          </p>

          <button
            onClick={() => setActivePage('home')}
            className="w-full py-4 bg-[#92003a] hover:bg-[#F62477] text-white font-montserrat font-bold text-xs uppercase tracking-widest rounded transition-all shadow-berry-glow cursor-pointer"
          >
            VOLVER AL INICIO
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Shipping & Billing Details */}
          <div className={`p-6 sm:p-8 rounded-2xl border space-y-6 shadow-xl ${
            isDarkMode ? 'bg-[#111114] border-neutral-800/80' : 'bg-white border-neutral-200'
          }`}>
            <h2 className="font-serif-chic font-bold text-2xl text-[#F62477] border-b border-neutral-800/60 pb-3">
              Shipping & Billing Details
            </h2>

            <div className="space-y-4 font-sans-body text-xs">
              <div>
                <label className="block text-neutral-300 font-montserrat font-semibold mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={shipping.fullName}
                  onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-neutral-900/80 border border-neutral-700/80 text-white placeholder-neutral-500 focus:outline-none focus:border-[#F62477] focus:ring-1 focus:ring-[#F62477]"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-montserrat font-semibold mb-1">
                  Address
                </label>
                <input
                  type="text"
                  required
                  placeholder="Address"
                  value={shipping.address}
                  onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-neutral-900/80 border border-neutral-700/80 text-white placeholder-neutral-500 focus:outline-none focus:border-[#F62477] focus:ring-1 focus:ring-[#F62477]"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-montserrat font-semibold mb-1">
                  City
                </label>
                <input
                  type="text"
                  required
                  placeholder="City"
                  value={shipping.city}
                  onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-neutral-900/80 border border-neutral-700/80 text-white placeholder-neutral-500 focus:outline-none focus:border-[#F62477] focus:ring-1 focus:ring-[#F62477]"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-montserrat font-semibold mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  required
                  placeholder="Postal Code"
                  value={shipping.postalCode}
                  onChange={(e) => setShipping({ ...shipping, postalCode: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-neutral-900/80 border border-neutral-700/80 text-white placeholder-neutral-500 focus:outline-none focus:border-[#F62477] focus:ring-1 focus:ring-[#F62477]"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-montserrat font-semibold mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={shipping.email}
                  onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-neutral-900/80 border border-neutral-700/80 text-white placeholder-neutral-500 focus:outline-none focus:border-[#F62477] focus:ring-1 focus:ring-[#F62477]"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Payment Methods Tiles */}
          <div className={`p-6 sm:p-8 rounded-2xl border space-y-6 shadow-xl flex flex-col justify-between ${
            isDarkMode ? 'bg-[#111114] border-neutral-800/80' : 'bg-white border-neutral-200'
          }`}>
            <div className="space-y-6">
              <h2 className="font-serif-chic font-bold text-2xl text-[#F62477] border-b border-neutral-800/60 pb-3">
                Payment Methods
              </h2>

              {/* Payment Tiles Grid matching Image 1 */}
              <div className="grid grid-cols-2 gap-3.5">
                {/* Credit/Debit Card Tile */}
                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#F62477] ring-1 ring-[#F62477] bg-[#1a1a22]'
                      : 'border-neutral-700/80 hover:border-neutral-500 bg-neutral-900/50'
                  }`}
                >
                  <CreditCard className="w-6 h-6 text-pink-300 shrink-0" />
                  <span className="font-montserrat font-bold text-xs text-white">Credit/Debit Card</span>
                </div>

                {/* PayPal Tile */}
                <div
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-4 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                    paymentMethod === 'paypal'
                      ? 'border-[#F62477] ring-1 ring-[#F62477] bg-[#1a1a22]'
                      : 'border-neutral-700/80 hover:border-neutral-500 bg-neutral-900/50'
                  }`}
                >
                  <span className="font-serif-chic font-bold text-amber-400 text-lg">P</span>
                  <span className="font-montserrat font-bold text-xs text-white">PayPal</span>
                </div>

                {/* Bizum Copper Shiny Tile */}
                <div
                  onClick={() => setPaymentMethod('bizum')}
                  className={`p-4 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all bg-copper-shine text-neutral-950 shadow-copper-glow ${
                    paymentMethod === 'bizum'
                      ? 'ring-2 ring-white scale-[1.02]'
                      : 'opacity-90 hover:opacity-100'
                  }`}
                >
                  <span className="font-black text-xl">%.</span>
                  <span className="font-montserrat font-black text-sm tracking-wide">Bizum</span>
                </div>

                {/* Apple Pay Tile */}
                <div
                  onClick={() => setPaymentMethod('applepay')}
                  className={`p-4 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    paymentMethod === 'applepay'
                      ? 'border-[#F62477] ring-1 ring-[#F62477] bg-[#1a1a22]'
                      : 'border-neutral-700/80 hover:border-neutral-500 bg-neutral-900/50'
                  }`}
                >
                  <span className="font-bold text-sm text-white"> Pay Apple Pay</span>
                </div>

                {/* Google Pay Tile */}
                <div
                  onClick={() => setPaymentMethod('gpay')}
                  className={`p-4 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    paymentMethod === 'gpay'
                      ? 'border-[#F62477] ring-1 ring-[#F62477] bg-[#1a1a22]'
                      : 'border-neutral-700/80 hover:border-neutral-500 bg-neutral-900/50'
                  }`}
                >
                  <span className="px-2 py-0.5 rounded bg-white text-black font-bold text-xs">
                    <span className="text-blue-500">G</span> Pay
                  </span>
                  <span className="font-montserrat font-bold text-xs text-white">Google Pay</span>
                </div>

                {/* Klarna Tile */}
                <div
                  onClick={() => setPaymentMethod('klarna')}
                  className={`p-4 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                    paymentMethod === 'klarna'
                      ? 'border-[#F62477] ring-1 ring-[#F62477] bg-[#1a1a22]'
                      : 'border-neutral-700/80 hover:border-neutral-500 bg-neutral-900/50'
                  }`}
                >
                  <span className="w-6 h-6 rounded bg-pink-300 text-black font-black flex items-center justify-center text-xs shrink-0">
                    K.
                  </span>
                  <span className="font-montserrat font-bold text-[11px] text-white leading-tight">
                    Klarna - Buy Now, Pay Later
                  </span>
                </div>
              </div>

              {/* Safe Checkout Badge */}
              <div className="flex justify-center pt-2">
                <div className="bg-[#FFE185] text-neutral-950 font-montserrat font-bold text-xs px-4 py-2 rounded-full inline-flex items-center gap-2 shadow">
                  <ShieldCheck className="w-4 h-4 text-emerald-800" />
                  <span>Safe Checkout</span>
                </div>
              </div>
            </div>

            {/* Total and Metallic Red PAGAR AHORA Button */}
            <div className="space-y-3 pt-6 border-t border-neutral-800/60">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-400 font-sans-body">Total a Pagar</span>
                <span className="font-montserrat font-bold text-2xl text-copper-gradient">{subtotal.toFixed(2)} €</span>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-metallic-berry text-white font-montserrat font-black text-lg tracking-widest uppercase transition-all shadow-berry-glow hover:scale-[1.01] active:scale-95 cursor-pointer border border-pink-500/30"
              >
                PAGAR AHORA
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

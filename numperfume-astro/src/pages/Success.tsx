import { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { clearCart } from '../store/cart';

export default function Success() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    if (sessionId) {
      clearCart();
    }
  }, []);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-brand-light px-4">
      <div className="bg-white p-10 max-w-lg w-full text-center shadow-sm">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-20 h-20 text-green-500" />
        </div>
        <h1 className="text-3xl font-serif text-brand-dark mb-4">¡Pedido Confirmado!</h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Gracias por tu compra. Hemos recibido tu pedido y nuestro equipo en Salou ya está preparando tu perfume con el mayor cuidado.
        </p>
        <div className="space-y-4">
          <a 
            href="/shop" 
            className="block w-full bg-brand-dark text-white py-3 font-medium hover:bg-gray-800 transition-colors"
          >
            Seguir Comprando
          </a>
          <a 
            href="/" 
            className="block w-full border border-gray-300 text-brand-dark py-3 font-medium hover:bg-gray-50 transition-colors"
          >
            Volver al Inicio
          </a>
        </div>
      </div>
    </div>
  );
}

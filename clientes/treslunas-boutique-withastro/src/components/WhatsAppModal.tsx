import React, { useState } from 'react';
import { MessageCircle, X, Check } from 'lucide-react';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({ isOpen, onClose }) => {
  const [topic, setTopic] = useState('asesoria-estilo');
  const [message, setMessage] = useState('¡Hola Erika! Me gustaría recibir asesoría de estilo sobre las prendas de 3 Lunas Boutique.');

  if (!isOpen) return null;

  const handleSendWhatsApp = () => {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/34600123456?text=${encoded}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#151518] border border-neutral-800 rounded-2xl p-6 sm:p-8 max-w-md w-full text-white space-y-6 shadow-2xl relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif-chic font-bold text-xl">Asesoría Directa con Erika</h3>
            <p className="text-xs text-neutral-400">Atención personalizada desde Cambrils</p>
          </div>
        </div>

        <div className="space-y-4 font-sans-body text-xs">
          <div>
            <label className="block font-montserrat font-semibold text-neutral-300 mb-1">
              ¿En qué podemos ayudarte?
            </label>
            <select
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
                if (e.target.value === 'asesoria-estilo') {
                  setMessage('¡Hola Erika! Me gustaría recibir asesoría de estilo sobre las prendas de 3 Lunas Boutique.');
                } else if (e.target.value === 'reserva-tienda') {
                  setMessage('¡Hola Erika! Me gustaría reservar una cita en la tienda de Cambrils para probarme varias prendas.');
                } else {
                  setMessage('¡Hola Erika! Tengo una duda sobre mi pedido o disponibilidad de producto.');
                }
              }}
              className="w-full px-3 py-2.5 rounded bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="asesoria-estilo">Asesoría de Estilo & Combinaciones</option>
              <option value="reserva-tienda">Reserva de Cita en Tienda Cambrils</option>
              <option value="duda-producto">Consulta de Tallas / Disponibilidad</option>
            </select>
          </div>

          <div>
            <label className="block font-montserrat font-semibold text-neutral-300 mb-1">
              Tu mensaje para Erika
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2.5 rounded bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:border-emerald-500 text-xs"
            />
          </div>
        </div>

        <button
          onClick={handleSendWhatsApp}
          className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-montserrat font-bold text-xs uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
        >
          <MessageCircle className="w-4 h-4" /> ABRIR WHATSAPP DIRECTO
        </button>
      </div>
    </div>
  );
};

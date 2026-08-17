import React, { useState } from 'react';
import { TripleMoonLogo } from './TripleMoonLogo';
import { PageView } from '../types';
import { Instagram, MapPin, Phone, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  setActivePage: (page: PageView) => void;
  isDarkMode: boolean;
  onOpenWhatsAppModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActivePage,
  isDarkMode,
  onOpenWhatsAppModal,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className={`border-t transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-[#0a0a0b] text-neutral-300 border-neutral-800' 
        : 'bg-[#1c1b1b] text-neutral-200 border-neutral-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <TripleMoonLogo variant="metallic" size={48} showText={true} textClassName="text-white" />
            <p className="text-sm text-neutral-400 font-sans-body leading-relaxed mt-4">
              Moda con carácter seleccionada en Cambrils. Piezas exclusivas, ateliers locales y elegancia atemporal curada por Erika.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button 
                onClick={onOpenWhatsAppModal}
                className="w-10 h-10 rounded-full bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all cursor-pointer"
                title="WhatsApp Directo"
              >
                <Phone className="w-4 h-4" />
              </button>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-pink-600/20 text-pink-400 border border-pink-500/30 flex items-center justify-center hover:bg-[#F62477] hover:text-white transition-all"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h3 className="font-montserrat font-bold text-sm uppercase tracking-widest text-white mb-6 border-b border-neutral-800 pb-2">
              Explorar
            </h3>
            <ul className="space-y-3 text-sm font-sans-body">
              <li>
                <button 
                  onClick={() => setActivePage('home')}
                  className="hover:text-[#F62477] transition-colors"
                >
                  Novedades de Temporada
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActivePage('catalog')}
                  className="hover:text-[#F62477] transition-colors"
                >
                  Catálogo Completo
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActivePage('about')}
                  className="hover:text-[#F62477] transition-colors"
                >
                  La Historia de Erika
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActivePage('contact')}
                  className="hover:text-[#F62477] transition-colors"
                >
                  Boutique en Cambrils
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActivePage('branding-guide')}
                  className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  ✨ Guía de Marca & Assets
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Cambrils Location & Hours */}
          <div>
            <h3 className="font-montserrat font-bold text-sm uppercase tracking-widest text-white mb-6 border-b border-neutral-800 pb-2">
              Boutique Cambrils
            </h3>
            <ul className="space-y-3 text-sm font-sans-body text-neutral-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F62477] shrink-0 mt-0.5" />
                <span>Carrer Major, 12, 43850 Cambrils, Tarragona, España</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F62477] shrink-0" />
                <span>+34 977 123 456 / +34 600 123 456</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#F62477] shrink-0" />
                <span>hola@3lunasboutique.es</span>
              </li>
              <li className="text-xs pt-2 text-neutral-500 border-t border-neutral-800/60">
                Horario: Lunes a Sábado <br />
                10:00 - 13:30 | 17:00 - 20:30
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h3 className="font-montserrat font-bold text-sm uppercase tracking-widest text-white mb-6 border-b border-neutral-800 pb-2">
              El Club 3 Lunas
            </h3>
            <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
              Suscríbete para recibir invitaciones privadas a ventas exclusivas, nuevas selecciones de Erika y promociones en Cambrils.
            </p>

            {subscribed ? (
              <div className="bg-emerald-950/40 border border-emerald-500/40 rounded p-3 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>¡Gracias por unirte! Te hemos enviado un 10% de bienvenida.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Tu correo electrónico..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#F62477]"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-[#92003a] hover:bg-[#F62477] text-white rounded text-xs transition-colors flex items-center justify-center cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] text-neutral-500">
                  Respetamos tu privacidad. Cancela cuando quieras.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} 3 Lunas Boutique Cambrils. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => setActivePage('branding-guide')} className="hover:text-white transition-colors">
              Guía de Marca & Assets
            </button>
            <button onClick={() => setActivePage('contact')} className="hover:text-white transition-colors">
              Aviso Legal
            </button>
            <button onClick={() => setActivePage('contact')} className="hover:text-white transition-colors">
              Política de Privacidad
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

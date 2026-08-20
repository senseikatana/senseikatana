import React from 'react';
import { TripleMoonLogo } from './TripleMoonLogo';
import { PageView } from '../types';
import { MapPin, Clock, Sparkles, Heart } from 'lucide-react';

interface AboutPageProps {
  setActivePage: (page: PageView) => void;
  isDarkMode: boolean;
  onOpenWhatsAppModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  setActivePage,
  isDarkMode,
  onOpenWhatsAppModal,
}) => {
  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-colors duration-300 ${
      isDarkMode ? 'bg-[#0a0a0c] text-white' : 'bg-[#fcf9f8] text-[#1c1b1b]'
    }`}>
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-xs font-montserrat font-bold uppercase tracking-[0.3em] text-[#92003a] dark:text-pink-400">
          3 LUNAS BOUTIQUE
        </span>
        <h1 className="font-serif-chic font-bold text-4xl sm:text-5xl mt-1 text-copper-gradient">
          SOBRE NOSOTROS
        </h1>
        <p className="text-sm font-sans-body text-neutral-400 mt-2">
          La Historia de Erika y 3 Lunas
        </p>
      </div>

      {/* Main Grid matching Image 7 */}
      <div className={`rounded-2xl p-6 sm:p-10 lg:p-12 border overflow-hidden shadow-2xl ${
        isDarkMode ? 'bg-[#121215] border-neutral-800' : 'bg-white border-neutral-200'
      }`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Portrait */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-2xl border border-neutral-700/40">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop"
                alt="Erika en 3 Lunas Boutique"
                className="w-full h-full object-cover grayscale object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white text-center">
                <p className="font-serif-chic font-bold text-2xl">Erika</p>
                <p className="text-xs font-montserrat tracking-widest text-amber-300 uppercase">
                  Fundadora & Directora Creativa
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Philosophy */}
          <div className="lg:col-span-7 space-y-8 font-sans-body">
            <div className="space-y-4">
              <h2 className="font-serif-chic font-bold text-3xl sm:text-4xl leading-snug">
                Nuestra Historia en Cambrils
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                Nacida en el corazón de Cambrils, 3 Lunas Boutique es el sueño de Erika. Inspirada por la belleza celestial y la artesanía local, creamos piezas únicas que celebran la feminidad y el estilo personal. Nuestra boutique es un santuario de moda y diseño, donde cada prenda cuenta una historia.
              </p>
            </div>

            {/* The Philosophy Section */}
            <div className="pt-4 border-t border-neutral-800 space-y-4">
              <h3 className="font-serif-chic font-bold text-xl">The Philosophy</h3>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80 space-y-2">
                  <span className="text-2xl block">🌙</span>
                  <h4 className="font-montserrat font-bold text-xs uppercase tracking-wider text-white">
                    SOSTENIBLE
                  </h4>
                  <p className="text-[11px] text-neutral-400">Tejidos naturales y producción consciente.</p>
                </div>

                <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80 space-y-2">
                  <Sparkles className="w-6 h-6 text-amber-400 mx-auto" />
                  <h4 className="font-montserrat font-bold text-xs uppercase tracking-wider text-white">
                    ARTESANAL
                  </h4>
                  <p className="text-[11px] text-neutral-400">Ateliers locales de Tarragona y España.</p>
                </div>

                <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80 space-y-2">
                  <TripleMoonLogo variant="metallic" size={32} />
                  <h4 className="font-montserrat font-bold text-xs uppercase tracking-wider text-white">
                    ATEMPORAL
                  </h4>
                  <p className="text-[11px] text-neutral-400">Diseños que perduran temporada tras temporada.</p>
                </div>
              </div>
            </div>

            {/* VISIT US Section */}
            <div className="pt-4 border-t border-neutral-800 space-y-2 text-center sm:text-left">
              <h3 className="font-montserrat font-bold text-xs uppercase tracking-[0.2em] text-[#F62477]">
                VISIT US
              </h3>
              <div className="space-y-1 text-xs text-neutral-300">
                <p className="font-semibold text-white">Encuéntranos en Cambrils:</p>
                <p className="flex items-center gap-1.5 justify-center sm:justify-start">
                  <MapPin className="w-4 h-4 text-amber-400" /> Carrer Major, 12, 43850 Cambrils, España.
                </p>
                <p className="flex items-center gap-1.5 justify-center sm:justify-start text-neutral-400">
                  <Clock className="w-4 h-4 text-amber-400" /> Abierto de Lunes a Sábado (10:00 - 13:30 | 17:00 - 20:30).
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={onOpenWhatsAppModal}
                  className="px-6 py-3 bg-[#92003a] hover:bg-[#F62477] text-white rounded font-montserrat font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  RESERVAR ASESORÍA PERSONAL CON ERIKA
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

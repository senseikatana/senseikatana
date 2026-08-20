import React from 'react';
import { TripleMoonLogo } from './TripleMoonLogo';
import { PageView } from '../types';

interface NotFoundProps {
  setActivePage: (page: PageView) => void;
}

export const NotFoundPage: React.FC<NotFoundProps> = ({ setActivePage }) => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center relative overflow-hidden bg-[#0d0d0f] text-white px-4">
      {/* Background Watermark Triple Moon */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none scale-150">
        <TripleMoonLogo variant="metallic" size={300} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-6 max-w-lg mx-auto">
        <h1 className="font-serif-chic font-bold text-8xl sm:text-9xl tracking-tight text-copper-gradient">
          404
        </h1>

        <p className="font-serif-chic text-xl sm:text-2xl text-neutral-300 font-medium">
          Parece que esta pieza no está en nuestra colección.
        </p>

        <p className="text-xs font-sans-body text-neutral-500 max-w-sm mx-auto">
          La página que buscas ha sido trasladada o ya no se encuentra disponible.
        </p>

        <div className="pt-4">
          <button
            onClick={() => setActivePage('home')}
            className="px-8 py-3.5 bg-copper-gradient text-white font-montserrat font-bold text-xs uppercase tracking-widest rounded shadow-copper-glow hover:scale-[1.03] transition-all cursor-pointer"
          >
            VOLVER AL INICIO
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Product, PageView, Category } from '../types';
import { ShoppingBag, ArrowRight, Store, Sparkles, Truck, Heart, Eye } from 'lucide-react';

interface HomePageProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size?: string, color?: string) => void;
  setActivePage: (page: PageView) => void;
  onSelectCategory: (category: Category) => void;
  isDarkMode: boolean;
  onOpenWhatsAppModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  setActivePage,
  onSelectCategory,
  isDarkMode,
  onOpenWhatsAppModal,
}) => {
  const featuredProducts = products.filter(p => p.featured || p.isNew).slice(0, 6);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-[#0e0e10] text-white' : 'bg-[#fcf9f8] text-[#1c1b1b]'
    }`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className={`rounded-2xl p-6 sm:p-10 lg:p-16 border relative overflow-hidden transition-all shadow-2xl ${
          isDarkMode 
            ? 'bg-[#151518] border-neutral-800/80 text-white' 
            : 'bg-[#f6f1ee] border-neutral-200/80 text-[#1c1b1b]'
        }`}>
          {/* Subtle background glow */}
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#92003a]/15 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-montserrat font-bold tracking-wider uppercase bg-[#92003a]/10 border border-[#92003a]/30 text-[#92003a] dark:text-pink-300">
                <Store className="w-3.5 h-3.5" />
                <span>Tienda Física en Cambrils</span>
              </div>

              {/* Title */}
              <h1 className="font-montserrat font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] uppercase">
                MODA CON CARÁCTER <br />
                <span className="text-copper-gradient">SELECCIONADA PARA TI.</span>
              </h1>

              {/* Subtitle */}
              <p className={`text-base sm:text-lg font-sans-body max-w-2xl leading-relaxed ${
                isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
              }`}>
                Encuentra prendas de vestir y accesorios curados por Erika para expresar tu mejor versión. Visítanos en nuestra boutique en Cambrils o realiza tu pedido online con entrega inmediata.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => {
                    setActivePage('catalog');
                    onSelectCategory('Todos');
                  }}
                  className="px-8 py-4 bg-[#92003a] hover:bg-[#F62477] text-white font-montserrat font-bold text-sm tracking-widest uppercase rounded shadow-berry-glow hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  VER COLECCIÓN <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenWhatsAppModal}
                  className={`px-6 py-4 border rounded font-montserrat font-bold text-sm tracking-widest uppercase hover:bg-neutral-500/10 transition-all flex items-center gap-2 cursor-pointer ${
                    isDarkMode 
                      ? 'border-[#B87333] text-amber-300 hover:border-amber-300' 
                      : 'border-[#92003a] text-[#92003a] hover:bg-[#92003a]/5'
                  }`}
                >
                  ASESORÍA DE ERIKA →
                </button>
              </div>
            </div>

            {/* Hero Right Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-xl overflow-hidden shadow-2xl group aspect-[4/5] max-w-md mx-auto">
                <img
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop"
                  alt="Moda con Carácter Cambrils"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Overlay Card Details */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-widest font-bold text-amber-300">Selección de Erika</p>
                      <h3 className="font-serif-chic text-lg font-bold">Vestido Midi Lino Beige</h3>
                    </div>
                    <span className="font-montserrat font-bold text-[#F62477] text-base">€149.95</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Value Proposition Badges */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`p-6 rounded-xl border flex items-start gap-4 transition-all hover:scale-[1.01] ${
            isDarkMode 
              ? 'bg-[#151518] border-neutral-800' 
              : 'bg-white border-neutral-200 shadow-sm'
          }`}>
            <div className="w-12 h-12 rounded-lg bg-[#92003a]/15 text-[#92003a] dark:text-pink-400 flex items-center justify-center shrink-0">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-montserrat font-bold text-base mb-1">Click & Collect en Cambrils</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Compra online y recoge hoy mismo en nuestra tienda física en el centro de Cambrils.
              </p>
            </div>
          </div>

          <div className={`p-6 rounded-xl border flex items-start gap-4 transition-all hover:scale-[1.01] ${
            isDarkMode 
              ? 'bg-[#151518] border-neutral-800' 
              : 'bg-white border-neutral-200 shadow-sm'
          }`}>
            <div className="w-12 h-12 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-montserrat font-bold text-base mb-1">La Selección de Erika</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Prendas curadas a mano con asesoría personalizada de estilo para cada ocasión.
              </p>
            </div>
          </div>

          <div className={`p-6 rounded-xl border flex items-start gap-4 transition-all hover:scale-[1.01] ${
            isDarkMode 
              ? 'bg-[#151518] border-neutral-800' 
              : 'bg-white border-neutral-200 shadow-sm'
          }`}>
            <div className="w-12 h-12 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-montserrat font-bold text-base mb-1">Envío Local en 24h</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Envíos exprés a Cambrils, Reus, Salou y toda la comarca de Tarragona.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Catalogue Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs font-montserrat font-bold uppercase tracking-[0.3em] text-[#92003a] dark:text-pink-400">
            CATÁLOGO
          </span>
          <h2 className="font-montserrat font-black text-3xl sm:text-4xl uppercase tracking-tight">
            DESCUBRE LAS NOVEDADES
          </h2>
          <div className="w-16 h-1 bg-[#92003a] mx-auto rounded-full mt-3" />
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className={`group rounded-xl overflow-hidden border transition-all duration-300 hover:shadow-xl ${
                isDarkMode 
                  ? 'bg-[#151518] border-neutral-800 hover:border-neutral-700' 
                  : 'bg-white border-neutral-200/80 hover:border-[#92003a]/30'
              }`}
            >
              {/* Image Box */}
              <div 
                onClick={() => onSelectProduct(product)}
                className="relative aspect-[4/5] overflow-hidden bg-neutral-900 cursor-pointer"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                  {product.isNew && (
                    <span className="bg-[#FFE185] text-neutral-900 text-[10px] font-montserrat font-bold px-2.5 py-1 rounded uppercase tracking-wider shadow">
                      Novedad
                    </span>
                  )}
                  {product.isBestseller && (
                    <span className="bg-[#92003a] text-white text-[10px] font-montserrat font-bold px-2.5 py-1 rounded uppercase tracking-wider shadow">
                      Favorito Erika
                    </span>
                  )}
                </div>

                {/* Quick Action Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 p-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProduct(product);
                    }}
                    className="p-3 bg-white text-neutral-900 rounded-full hover:bg-[#92003a] hover:text-white transition-colors shadow-lg cursor-pointer"
                    title="Ver detalle"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    className="p-3 bg-[#92003a] text-white rounded-full hover:bg-[#F62477] transition-colors shadow-lg cursor-pointer"
                    title="Añadir a la cesta"
                  >
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 text-center space-y-2">
                <p className="text-[11px] font-montserrat uppercase tracking-widest text-neutral-500">
                  {product.category}
                </p>
                <h3 
                  onClick={() => onSelectProduct(product)}
                  className="font-serif-chic font-bold text-lg hover:text-[#F62477] transition-colors cursor-pointer line-clamp-1"
                >
                  {product.name}
                </h3>
                <div className="flex items-center justify-center gap-2">
                  <span className="font-montserrat font-bold text-[#92003a] dark:text-pink-400 text-lg">
                    €{product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-neutral-400 line-through">
                      €{product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Catalogue CTA */}
        <div className="text-center mt-12">
          <button
            onClick={() => {
              setActivePage('catalog');
              onSelectCategory('Todos');
            }}
            className="px-8 py-3.5 border-2 border-[#92003a] text-[#92003a] dark:text-pink-300 dark:border-pink-400 font-montserrat font-bold text-xs tracking-widest uppercase rounded hover:bg-[#92003a] hover:text-white transition-all cursor-pointer"
          >
            VER CATÁLOGO COMPLETO
          </button>
        </div>
      </section>

      {/* About Erika Callout Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className={`rounded-2xl p-8 sm:p-12 border overflow-hidden relative ${
          isDarkMode ? 'bg-[#151518] border-neutral-800' : 'bg-[#f6f1ee] border-neutral-200'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-montserrat font-bold uppercase tracking-widest text-[#92003a] dark:text-pink-400">
                CAMBRILS BOUTIQUE
              </span>
              <h2 className="font-serif-chic font-bold text-3xl sm:text-4xl leading-tight">
                "La moda no es solo vestir, es celebrar tu luz personal cada día."
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 font-sans-body leading-relaxed">
                Fundada por Erika en el casco histórico de Cambrils, 3 Lunas une el carácter mediterráneo con la elegancia celestial.
              </p>
              <button
                onClick={() => setActivePage('about')}
                className="inline-flex items-center gap-2 font-montserrat font-bold text-xs uppercase tracking-widest text-[#92003a] dark:text-pink-400 hover:underline pt-2 cursor-pointer"
              >
                CONOCE NUESTRA HISTORIA →
              </button>
            </div>

            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop"
                alt="Erika en Cambrils"
                className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

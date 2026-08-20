import React, { useState } from 'react';
import { Product, PageView } from '../types';
import { ShoppingBag, ChevronRight, Check, ShieldCheck, Truck, RefreshCw, MessageCircle } from 'lucide-react';

interface PDPProps {
  product: Product;
  allProducts: Product[];
  onAddToCart: (product: Product, size: string, color: string) => void;
  onSelectProduct: (product: Product) => void;
  setActivePage: (page: PageView) => void;
  isDarkMode: boolean;
  onOpenWhatsAppModal: () => void;
}

export const ProductDetailPage: React.FC<PDPProps> = ({
  product,
  allProducts,
  onAddToCart,
  onSelectProduct,
  setActivePage,
  isDarkMode,
  onOpenWhatsAppModal,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);
  const [accordionOpen, setAccordionOpen] = useState<boolean>(false);

  // Cross sell complete the look products
  const completeLookProducts = allProducts.filter(p => 
    product.completeTheLookIds?.includes(p.id) || 
    (p.id !== product.id && p.category === 'Accesorios')
  ).slice(0, 2);

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  return (
    <div className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-colors duration-300 ${
      isDarkMode ? 'bg-[#0b0b0d] text-white' : 'bg-[#fcf9f8] text-[#1c1b1b]'
    }`}>
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-sans-body text-neutral-500 mb-8">
        <button onClick={() => setActivePage('home')} className="hover:text-[#92003a]">
          Inicio
        </button>
        <ChevronRight className="w-3 h-3" />
        <button onClick={() => setActivePage('catalog')} className="hover:text-[#92003a]">
          Colección
        </button>
        <ChevronRight className="w-3 h-3" />
        <span className="text-neutral-400">{product.category}</span>
        <ChevronRight className="w-3 h-3" />
        <span className="font-bold text-[#92003a] dark:text-pink-400 line-clamp-1">{product.name}</span>
      </nav>

      {/* Main PDP Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Gallery Section: Vertical Thumbnails + Main Image */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          {/* Vertical Thumbnails */}
          <div className="flex sm:flex-col gap-3 shrink-0 overflow-x-auto sm:overflow-y-auto max-h-[600px] no-scrollbar">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-20 aspect-[4/5] rounded overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                  activeImageIndex === idx
                    ? 'border-[#92003a] scale-95 shadow'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Main Large Image */}
          <div className="relative flex-1 aspect-[4/5] rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-xl">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-500"
            />
            {product.isNew && (
              <span className="absolute top-4 left-4 bg-[#FFE185] text-neutral-900 text-xs font-montserrat font-bold px-3 py-1 rounded uppercase tracking-wider shadow">
                Novedad Exclusiva
              </span>
            )}
          </div>
        </div>

        {/* Right Details & Selection Column */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="text-xs font-montserrat font-bold uppercase tracking-widest text-[#92003a] dark:text-pink-400">
              {product.category}
            </span>
            <h1 className="font-serif-chic font-bold text-3xl sm:text-4xl mt-1 leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mt-3">
              <span className="font-montserrat font-bold text-2xl text-[#92003a] dark:text-pink-300">
                €{product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-neutral-400 line-through">
                  €{product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Description & Erika's Tip */}
          <div className="space-y-3 border-t border-b border-neutral-700/30 py-4 font-sans-body text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
            <p>{product.description}</p>
            {product.adviceFromErika && (
              <div className="p-3.5 rounded-lg bg-[#92003a]/10 border border-[#92003a]/20 text-xs text-[#92003a] dark:text-pink-200 italic">
                {product.adviceFromErika}
              </div>
            )}
          </div>

          {/* Color Selector */}
          <div>
            <label className="block text-xs font-montserrat font-bold uppercase tracking-wider mb-2 text-neutral-400">
              Color: <span className="text-neutral-200">{selectedColor}</span>
            </label>
            <div className="flex items-center gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={`w-9 h-9 rounded-full ${c.bgClass} flex items-center justify-center transition-all cursor-pointer relative shadow-sm ${
                    selectedColor === c.name
                      ? 'ring-2 ring-offset-2 ring-[#92003a] scale-110'
                      : 'hover:scale-105 opacity-80'
                  }`}
                  title={c.name}
                >
                  {selectedColor === c.name && (
                    <Check className={`w-4 h-4 ${c.hex === '#FFFFFF' ? 'text-black' : 'text-white'}`} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-montserrat font-bold uppercase tracking-wider text-neutral-400">
                Tamaño: <span className="text-neutral-200">{selectedSize}</span>
              </label>
              <button
                onClick={() => setShowSizeGuide(!showSizeGuide)}
                className="text-xs font-montserrat font-semibold underline text-[#92003a] dark:text-pink-400 hover:text-[#F62477] cursor-pointer"
              >
                Guía de tallas
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`px-4 py-2.5 rounded font-montserrat font-bold text-xs uppercase transition-all cursor-pointer border ${
                    selectedSize === sz
                      ? 'bg-[#92003a] text-white border-[#92003a] shadow'
                      : isDarkMode
                      ? 'bg-[#18181b] border-neutral-700 text-neutral-300 hover:border-neutral-500'
                      : 'bg-white border-neutral-300 text-neutral-800 hover:border-neutral-400'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* CTAs: Add to Cart & WhatsApp */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleAddToCart}
              className={`w-full py-4 rounded font-montserrat font-bold text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
                addedAnimation
                  ? 'bg-emerald-600 text-white'
                  : 'bg-black dark:bg-white text-white dark:text-black hover:bg-[#92003a] dark:hover:bg-[#92003a] dark:hover:text-white'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-5 h-5" /> ¡AÑADIDO A LA CESTA!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" /> AÑADIR A LA CESTA
                </>
              )}
            </button>

            <button
              onClick={onOpenWhatsAppModal}
              className={`w-full py-3.5 border rounded font-montserrat font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isDarkMode
                  ? 'border-neutral-700 text-white hover:bg-neutral-800'
                  : 'border-neutral-900 text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              <MessageCircle className="w-4 h-4 text-emerald-500" /> CONSULTA POR WHATSAPP CON ERIKA
            </button>
          </div>

          {/* Completa el Look */}
          {completeLookProducts.length > 0 && (
            <div className="pt-6 border-t border-neutral-700/30 space-y-3">
              <h3 className="font-serif-chic font-bold text-base">Completa el look</h3>
              <div className="grid grid-cols-2 gap-3">
                {completeLookProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => onSelectProduct(p)}
                    className={`p-2.5 rounded-lg border flex items-center gap-3 cursor-pointer transition-all hover:scale-[1.02] ${
                      isDarkMode ? 'bg-[#151518] border-neutral-800' : 'bg-white border-neutral-200'
                    }`}
                  >
                    <img src={p.images[0]} alt={p.name} className="w-12 h-14 object-cover rounded" />
                    <div className="overflow-hidden">
                      <p className="font-serif-chic font-bold text-xs line-clamp-1">{p.name}</p>
                      <p className="font-montserrat text-xs text-[#92003a] dark:text-pink-400 font-bold mt-0.5">
                        €{p.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Guía de Tallas y Cuidados Accordion */}
          <div className="pt-4 border-t border-neutral-700/30">
            <button
              onClick={() => setAccordionOpen(!accordionOpen)}
              className="w-full flex items-center justify-between text-xs font-montserrat font-bold uppercase py-2 cursor-pointer text-neutral-400 hover:text-white"
            >
              <span>Guía de Tallas y Cuidados</span>
              <span>{accordionOpen ? '−' : '+'}</span>
            </button>
            {accordionOpen && (
              <div className="py-3 text-xs font-sans-body space-y-2 text-neutral-400 animate-fadeIn">
                <p>• Lavar a mano o ciclo delicado en agua fría (máx. 30ºC).</p>
                <p>• No usar lejía. Planchar a baja temperatura por el revés.</p>
                <p>• Confección respetuosa en ateliers locales de España.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#18181b] border border-neutral-700 rounded-xl p-6 max-w-md w-full text-white space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="font-serif-chic font-bold text-xl">Guía de Tallas (cm)</h3>
              <button onClick={() => setShowSizeGuide(false)} className="text-neutral-400 hover:text-white">
                ✕
              </button>
            </div>
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-neutral-700 text-neutral-400 uppercase font-montserrat">
                  <th className="py-2">Talla</th>
                  <th className="py-2">Pecho</th>
                  <th className="py-2">Cintura</th>
                  <th className="py-2">Cadera</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                <tr><td className="py-2 font-bold">XS</td><td>82-85</td><td>62-65</td><td>88-91</td></tr>
                <tr><td className="py-2 font-bold">S</td><td>86-89</td><td>66-69</td><td>92-95</td></tr>
                <tr><td className="py-2 font-bold">M</td><td>90-93</td><td>70-73</td><td>96-99</td></tr>
                <tr><td className="py-2 font-bold">L</td><td>94-98</td><td>74-78</td><td>100-104</td></tr>
                <tr><td className="py-2 font-bold">XL</td><td>99-103</td><td>79-83</td><td>105-109</td></tr>
              </tbody>
            </table>
            <button
              onClick={() => setShowSizeGuide(false)}
              className="w-full py-2.5 bg-[#92003a] text-white rounded font-montserrat font-bold text-xs uppercase cursor-pointer"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

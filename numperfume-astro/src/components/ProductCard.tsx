import { useState } from 'react';
import { addItem, type Product } from '../store/cart';
import { ShoppingBag, Droplets } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [sizeIndex, setSizeIndex] = useState(0);
  const currentSize = product.sizes[sizeIndex];

  const handleAddToCart = () => {
    addItem(product, currentSize.size, currentSize.price);
  };

  return (
    <div className="group flex flex-col bg-white dark:bg-gray-900 p-5 shadow-sm hover:shadow-xl transition-all duration-500 border border-transparent dark:border-gray-800">
      {/* Image Container with Overlay */}
      <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-gray-100 dark:bg-gray-800">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        
        {/* Bottle Label Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="bg-white/90 dark:bg-black/80 backdrop-blur-sm p-4 text-center shadow-lg border border-gray-100/50 dark:border-gray-800/50 min-w-[120px] transform transition-transform duration-500 group-hover:scale-110">
            <p className="font-serif text-brand-dark dark:text-white text-xs tracking-[0.2em] uppercase mb-1">NUM Perfume</p>
            <p className="text-brand-gold text-sm font-medium tracking-widest">{product.name}</p>
            <p className="text-gray-500 dark:text-gray-400 text-[10px] mt-2 tracking-wider">{currentSize.size}</p>
          </div>
        </div>

        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-500 pointer-events-none" />
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-grow text-center">
        <h3 className="font-serif text-xl text-brand-dark dark:text-white mb-2">{product.name}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 flex-grow font-light leading-relaxed">
          {product.description}
        </p>
        
        {/* Notes */}
        <div className="flex items-center justify-center gap-2 mb-4 text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider">
          <Droplets className="w-3 h-3" />
          <span>{product.notes.slice(0, 2).join(' · ')}</span>
        </div>

        {/* Size Selector */}
        <div className="flex justify-center gap-2 mb-6">
          {product.sizes.map((size, index) => (
            <button
              key={size.size}
              onClick={() => setSizeIndex(index)}
              className={`px-2 py-1 text-[10px] font-medium transition-colors border ${
                sizeIndex === index
                  ? 'border-brand-dark dark:border-white bg-brand-dark dark:bg-white text-white dark:text-brand-dark'
                  : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500'
              }`}
            >
              {size.size}
            </button>
          ))}
        </div>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
          <span className="font-serif text-lg text-brand-dark dark:text-white">
            {currentSize.price.toFixed(2)} €
          </span>
          <button 
            onClick={handleAddToCart}
            className="flex items-center justify-center bg-brand-dark dark:bg-white text-white dark:text-brand-dark px-4 py-2 text-xs font-medium hover:bg-brand-gold dark:hover:bg-brand-gold dark:hover:text-white transition-colors duration-300"
          >
            <ShoppingBag className="w-3 h-3 mr-2" />
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
}

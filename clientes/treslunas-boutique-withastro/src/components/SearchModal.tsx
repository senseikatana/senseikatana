import React, { useState } from 'react';
import { Product } from '../types';
import { Search, X, ChevronRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = query.trim() === '' ? [] : products.filter(
    (p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-start justify-center pt-20 px-4">
      <div className="bg-[#151518] border border-neutral-800 rounded-2xl p-6 max-w-xl w-full text-white space-y-4 shadow-2xl relative animate-fadeIn">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
          <div className="flex items-center gap-2 flex-1">
            <Search className="w-5 h-5 text-neutral-400" />
            <input
              type="text"
              autoFocus
              placeholder="Buscar por nombre, tipo o material (ej: Lino, Vestido)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-sm focus:outline-none placeholder-neutral-500"
            />
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results list */}
        <div className="max-h-[350px] overflow-y-auto space-y-2 no-scrollbar">
          {query.trim() !== '' && results.length === 0 && (
            <p className="text-xs text-neutral-500 py-6 text-center">No se encontraron productos para "{query}"</p>
          )}

          {results.map((product) => (
            <div
              key={product.id}
              onClick={() => {
                onSelectProduct(product);
                onClose();
              }}
              className="p-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 flex items-center justify-between cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <img src={product.images[0]} alt={product.name} className="w-10 h-12 object-cover rounded bg-neutral-800" />
                <div>
                  <p className="font-serif-chic font-bold text-sm">{product.name}</p>
                  <p className="text-[10px] text-neutral-400 uppercase font-montserrat">{product.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-montserrat font-bold text-xs text-[#92003a] dark:text-pink-400">
                  €{product.price.toFixed(2)}
                </span>
                <ChevronRight className="w-4 h-4 text-neutral-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

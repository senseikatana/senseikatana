import { useState } from 'react';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Shop() {
  const [filter, setFilter] = useState('todos');

  const filteredProducts = filter === 'todos' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === filter);

  return (
    <div className="bg-brand-light dark:bg-brand-dark min-h-screen py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-brand-dark dark:text-white mb-6">Colección NUM Perfume</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg font-light">
            Descubre nuestra colección exclusiva. Perfumes de autor elaborados con esencia única para quienes buscan algo diferente.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {['todos', 'mujer', 'hombre', 'unisex'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 text-sm font-medium tracking-wider uppercase transition-all duration-300 border ${
                filter === cat 
                  ? 'bg-brand-dark dark:bg-white text-white dark:text-brand-dark border-brand-dark dark:border-white' 
                  : 'bg-transparent text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-700 hover:border-brand-dark dark:hover:border-white hover:text-brand-dark dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

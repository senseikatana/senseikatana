import React, { useState, useMemo } from 'react';
import { Product, Category } from '../types';
import { ShoppingBag, Eye, SlidersHorizontal, Search, X } from 'lucide-react';

interface CatalogPageProps {
  products: Product[];
  selectedCategory: Category;
  setSelectedCategory: (cat: Category) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  isDarkMode: boolean;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  products,
  selectedCategory,
  setSelectedCategory,
  onSelectProduct,
  onAddToCart,
  isDarkMode,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(350);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);

  const categories: Category[] = ['Todos', 'Vestidos', 'Top & Blusas', 'Pantalones', 'Accesorios', 'Joyería'];
  const sizes = ['All', 'XS', 'S', 'M', 'L', 'XL', 'Única'];

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory;
        const matchesSize = selectedSize === 'All' || p.sizes.includes(selectedSize);
        const matchesPrice = p.price <= maxPrice;
        const matchesSearch = searchQuery === '' || 
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          p.description.toLowerCase().includes(searchQuery.toLowerCase());
        
        return matchesCategory && matchesSize && matchesPrice && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, selectedCategory, selectedSize, maxPrice, sortBy, searchQuery]);

  return (
    <div className={`min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-colors duration-300 ${
      isDarkMode ? 'bg-[#0f0f11] text-white' : 'bg-[#fcf9f8] text-[#1c1b1b]'
    }`}>
      {/* Header Title Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-neutral-700/30">
        <div>
          <span className="text-xs font-montserrat font-bold uppercase tracking-[0.25em] text-[#92003a] dark:text-pink-400">
            3 LUNAS BOUTIQUE
          </span>
          <h1 className="font-serif-chic font-bold text-4xl sm:text-5xl mt-1 text-copper-gradient">
            Colección
          </h1>
          <p className="text-xs text-neutral-500 mt-1 font-sans-body">
            Mostrando {filteredProducts.length} piezas seleccionadas
          </p>
        </div>

        {/* Right Sort Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="lg:hidden px-4 py-2 bg-neutral-800 text-white rounded text-xs font-montserrat font-bold flex items-center gap-2 cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filtros
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-500 font-montserrat font-semibold hidden sm:inline">Ordenar:</span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className={`px-3 py-2 rounded text-xs font-sans-body border focus:outline-none focus:border-[#92003a] cursor-pointer ${
                isDarkMode 
                  ? 'bg-[#18181b] border-neutral-700 text-white' 
                  : 'bg-white border-neutral-300 text-neutral-900'
              }`}
            >
              <option value="featured">Destacados</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="newest">Más Recientes</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters (Desktop + Mobile Drawer) */}
        <aside className={`lg:block ${
          mobileFiltersOpen ? 'block fixed inset-0 z-50 p-6 overflow-y-auto bg-black/95 text-white' : 'hidden'
        }`}>
          {mobileFiltersOpen && (
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-800 lg:hidden">
              <h2 className="font-montserrat font-bold text-lg">Filtros</h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="p-2">
                <X className="w-6 h-6" />
              </button>
            </div>
          )}

          <div className="space-y-8 font-sans-body">
            {/* Search Input */}
            <div>
              <h3 className="font-montserrat font-bold text-xs uppercase tracking-wider text-neutral-400 mb-3">
                Buscar
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar prendas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full px-3 py-2 pl-9 text-xs rounded border focus:outline-none focus:border-[#92003a] ${
                    isDarkMode ? 'bg-[#18181b] border-neutral-700 text-white' : 'bg-white border-neutral-300 text-neutral-900'
                  }`}
                />
                <Search className="w-4 h-4 absolute left-2.5 top-2.5 text-neutral-400" />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="font-montserrat font-bold text-xs uppercase tracking-wider text-neutral-400 mb-3">
                Categoría
              </h3>
              <ul className="space-y-2 text-sm">
                {categories.map((cat) => {
                  const count = cat === 'Todos' 
                    ? products.length 
                    : products.filter(p => p.category === cat).length;

                  return (
                    <li key={cat}>
                      <button
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full flex items-center justify-between py-1.5 px-2 rounded text-left transition-colors cursor-pointer ${
                          selectedCategory === cat
                            ? 'font-bold text-[#92003a] bg-[#92003a]/10 dark:text-pink-400'
                            : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        <span>{cat}</span>
                        <span className="text-xs text-neutral-500">({count})</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Size Filter */}
            <div>
              <h3 className="font-montserrat font-bold text-xs uppercase tracking-wider text-neutral-400 mb-3">
                Talla
              </h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-3 py-1.5 rounded text-xs font-montserrat font-bold transition-all cursor-pointer ${
                      selectedSize === sz
                        ? 'bg-[#92003a] text-white'
                        : isDarkMode
                        ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                        : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-montserrat font-bold text-xs uppercase tracking-wider text-neutral-400">
                  Rango de Precio
                </h3>
                <span className="text-xs font-bold text-copper-gradient">€30.00 - €{maxPrice}.00</span>
              </div>
              <input
                type="range"
                min="30"
                max="350"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#92003a] cursor-pointer"
              />
            </div>

            {/* Reset Filters */}
            <button
              onClick={() => {
                setSelectedCategory('Todos');
                setSelectedSize('All');
                setMaxPrice(350);
                setSearchQuery('');
              }}
              className="w-full py-2 border border-neutral-700 text-neutral-400 hover:text-white hover:border-neutral-500 rounded text-xs font-montserrat uppercase tracking-wider transition-colors cursor-pointer"
            >
              Limpiar Filtros
            </button>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-neutral-700/50 rounded-xl">
              <p className="text-neutral-400 text-base font-serif-chic mb-2">
                No se encontraron productos con estos filtros.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('Todos');
                  setSelectedSize('All');
                  setMaxPrice(350);
                  setSearchQuery('');
                }}
                className="px-6 py-2 bg-[#92003a] text-white rounded text-xs font-montserrat font-bold uppercase mt-2 cursor-pointer"
              >
                Restablecer Búsqueda
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={`group rounded-xl overflow-hidden border transition-all duration-300 hover:shadow-xl ${
                    isDarkMode 
                      ? 'bg-[#151518] border-neutral-800 hover:border-neutral-700' 
                      : 'bg-white border-neutral-200/80 hover:border-[#92003a]/30'
                  }`}
                >
                  <div
                    onClick={() => onSelectProduct(product)}
                    className="relative aspect-[4/5] bg-neutral-900 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Quick overlay buttons */}
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

                  <div className="p-4 text-center space-y-1">
                    <p className="text-[10px] font-montserrat uppercase tracking-widest text-neutral-500">
                      {product.category}
                    </p>
                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="font-serif-chic font-bold text-base hover:text-[#F62477] transition-colors cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-center gap-2 pt-1">
                      <span className="font-montserrat font-bold text-[#92003a] dark:text-pink-400 text-base">
                        €{product.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

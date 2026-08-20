'use client';

import { useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  productCount: number;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (slug: string | null) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategorySelect,
}: CategoryFilterProps) {
  const handleCategoryClick = useCallback(
    (slug: string | null) => {
      onCategorySelect(slug);
    },
    [onCategorySelect]
  );

  return (
    <div id="categorias" className="py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-amber-900">
          Categorías
        </h2>
        <p className="text-amber-600 mt-2">
          Explora nuestras colecciones por categoría
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {/* All Categories */}
        <Card
          className={cn(
            'cursor-pointer transition-all duration-200 hover:shadow-md',
            selectedCategory === null
              ? 'border-amber-400 bg-amber-50 shadow-md'
              : 'border-amber-100 hover:border-amber-300'
          )}
          onClick={() => handleCategoryClick(null)}
        >
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
              <span className="text-white text-xl font-bold">✦</span>
            </div>
            <h3 className="font-medium text-amber-900 text-sm">Todos</h3>
          </CardContent>
        </Card>

        {/* Category Items */}
        {categories.map((category) => (
          <Card
            key={category.id}
            className={cn(
              'cursor-pointer transition-all duration-200 hover:shadow-md',
              selectedCategory === category.slug
                ? 'border-amber-400 bg-amber-50 shadow-md'
                : 'border-amber-100 hover:border-amber-300'
            )}
            onClick={() => handleCategoryClick(category.slug)}
          >
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center overflow-hidden">
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-amber-700 text-lg font-bold">
                    {category.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <h3 className="font-medium text-amber-900 text-sm line-clamp-1">
                {category.name}
              </h3>
              <p className="text-xs text-amber-500 mt-0.5">
                {category.productCount} productos
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

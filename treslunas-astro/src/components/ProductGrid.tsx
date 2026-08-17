'use client';

import { ProductCard } from './ProductCard';
import type { Product } from '@/types';

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  id?: string;
}

export function ProductGrid({ products, title, subtitle, id }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <section id={id} className="py-8">
        {(title || subtitle) && (
          <div className="text-center mb-8">
            {title && (
              <h2 className="text-2xl md:text-3xl font-bold text-amber-900">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-amber-600 mt-2">{subtitle}</p>
            )}
          </div>
        )}
        <div className="text-center py-12">
          <p className="text-amber-600">No hay productos disponibles.</p>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="py-8">
      {(title || subtitle) && (
        <div className="text-center mb-8">
          {title && (
            <h2 className="text-2xl md:text-3xl font-bold text-amber-900">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-amber-600 mt-2">{subtitle}</p>
          )}
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

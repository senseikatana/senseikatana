'use client';

import { Star, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Product {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  images: string | string[];
  rating?: number;
  brand?: string | null;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  // Safely parse images which can be JSON string or array of strings
  let imageList: string[] = [];
  try {
    if (typeof product.images === 'string') {
      imageList = JSON.parse(product.images);
    } else if (Array.isArray(product.images)) {
      imageList = product.images;
    }
  } catch (e) {
    imageList = [];
  }

  const mainImage = imageList[0] || 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80';

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Add standard default variant since this is a quick action
    addItem({
      productId: product.id,
      variantId: `var-${product.id}-default`, // Fallback default variant id
      sku: `SKU-${product.id}-DEF`.toUpperCase(),
      title: product.title,
      size: 'Única',
      color: 'Estándar',
      price: product.price,
      image: mainImage,
      stockOnline: 10,
    }, 1);

    toast.success(`${product.title} añadido al carrito!`);
    openCart();
  };

  const ratingValue = product.rating || 4.2;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-stone-950/40">
      {/* Product Image */}
      <a href={`/productos/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={mainImage}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Quick Add Button overlay */}
        <div className="absolute inset-0 flex items-end justify-center p-4 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="sm"
            onClick={handleQuickAdd}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-md font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Añadir Rápido
          </Button>
        </div>
      </a>

      {/* Product Info */}
      <div className="flex flex-1 flex-col p-4 space-y-2">
        {product.brand && (
          <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
            {product.brand}
          </span>
        )}
        
        <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">
          <a href={`/productos/${product.slug}`}>
            {product.title}
          </a>
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex items-center text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(ratingValue) ? 'fill-current' : 'text-stone-300 dark:text-stone-700'
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] text-muted-foreground font-medium">
            {ratingValue.toFixed(1)}
          </span>
        </div>

        {/* Price & Details Link */}
        <div className="flex items-center justify-between pt-2 mt-auto border-t border-border/50">
          <span className="text-base font-bold tracking-tight">
            {product.price.toFixed(2)} €
          </span>
          <a
            href={`/productos/${product.slug}`}
            className="text-xs font-semibold uppercase tracking-wider text-primary hover:underline"
          >
            Ver más
          </a>
        </div>
      </div>
    </div>
  );
}

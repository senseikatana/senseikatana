'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/cart';
import { Button } from '@/components/ui/button';
import { ShoppingBag, MapPin, Globe } from 'lucide-react';

export interface Variant {
  id: string;
  productId: string;
  size: string;
  color: string;
  stockOnline: number;
  stockPhysical: number;
  sku: string;
}

export interface ProductDetails {
  id: string;
  title: string;
  price: number;
  image: string;
}

interface AddToCartSectionProps {
  product: ProductDetails;
  variants: Variant[];
}

export function AddToCartSection({ product, variants }: AddToCartSectionProps) {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  // Extract unique sizes and colors
  const sizes = Array.from(new Set(variants.map((v) => v.size)));
  const colors = Array.from(new Set(variants.map((v) => v.color)));

  // Selection states
  const [selectedSize, setSelectedSize] = useState<string>(sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState<string>(colors[0] || '');
  const [quantity, setQuantity] = useState<number>(1);

  // Find active variant matching selection
  const activeVariant = variants.find(
    (v) => v.size === selectedSize && v.color === selectedColor
  );

  const isOutOfStock = !activeVariant || (activeVariant.stockOnline === 0 && activeVariant.stockPhysical === 0);

  const handleAddToCart = () => {
    if (!activeVariant) return;

    addItem({
      productId: product.id,
      variantId: activeVariant.id,
      sku: activeVariant.sku,
      title: product.title,
      size: selectedSize,
      color: selectedColor,
      price: product.price,
      image: product.image,
      stockOnline: activeVariant.stockOnline,
    }, quantity);

    openCart(); // Premium micro-interaction: open the cart drawer when item is added
  };

  return (
    <div className="space-y-6">
      {/* Color Selector */}
      {colors.length > 0 && (
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Color: <span className="text-foreground font-extrabold">{selectedColor}</span>
          </label>
          <div className="flex gap-2 flex-wrap">
            {colors.map((color) => {
              const isSelected = selectedColor === color;
              return (
                <button
                  key={color}
                  onClick={() => {
                    setSelectedColor(color);
                    // Check if current size is available in new color, otherwise reset size selection
                    const hasSize = variants.some((v) => v.color === color && v.size === selectedSize);
                    if (!hasSize) {
                      const firstAvailSize = variants.find((v) => v.color === color)?.size;
                      if (firstAvailSize) setSelectedSize(firstAvailSize);
                    }
                  }}
                  className={`px-4 py-2 text-xs font-bold uppercase border tracking-wider transition-all duration-200 rounded-md ${
                    isSelected
                      ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                      : 'border-border text-foreground bg-card hover:bg-accent hover:border-accent-foreground/50'
                  }`}
                >
                  {color}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Size Selector */}
      {sizes.length > 0 && (
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Talla: <span className="text-foreground font-extrabold">{selectedSize}</span>
          </label>
          <div className="flex gap-2 flex-wrap">
            {sizes.map((size) => {
              const isSelected = selectedSize === size;
              const hasStock = variants.some(
                (v) => v.size === size && v.color === selectedColor && (v.stockOnline > 0 || v.stockPhysical > 0)
              );

              return (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  disabled={!hasStock && !isSelected}
                  className={`px-4 py-2 text-xs font-bold border tracking-wider transition-all duration-200 rounded-md ${
                    isSelected
                      ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                      : hasStock
                      ? 'border-border text-foreground bg-card hover:bg-accent hover:border-accent-foreground/50'
                      : 'border-border/30 text-muted-foreground/30 bg-muted/20 cursor-not-allowed line-through'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity & Stock Status */}
      <div className="py-4 border-y border-border space-y-4">
        {activeVariant && (
          <div className="space-y-2 text-xs font-medium">
            {/* Online Stock Status */}
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              {activeVariant.stockOnline > 0 ? (
                <span className="text-muted-foreground">
                  Stock Online:{' '}
                  <span className="text-foreground font-bold">
                    {activeVariant.stockOnline} unidades disponibles
                  </span>
                </span>
              ) : (
                <span className="text-destructive font-semibold">Agotado online (disponible solo recogida)</span>
              )}
            </div>

            {/* Physical Store Stock Status */}
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              {activeVariant.stockPhysical > 0 ? (
                <span className="text-muted-foreground">
                  Disponible para recogida hoy en{' '}
                  <span className="text-foreground font-bold">Cambrils</span> ({activeVariant.stockPhysical} en tienda)
                </span>
              ) : (
                <span className="text-muted-foreground">Recogida disponible bajo pedido en 24-48h</span>
              )}
            </div>
          </div>
        )}

        {/* Quantity selector */}
        {!isOutOfStock && activeVariant && (
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Cantidad:</span>
            <div className="flex items-center border border-border bg-muted/30 rounded-md overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="h-8 w-8 flex items-center justify-center font-bold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                -
              </button>
              <span className="w-8 text-center text-xs font-bold text-foreground">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(activeVariant.stockOnline || 10, quantity + 1))}
                className="h-8 w-8 flex items-center justify-center font-bold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                +
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Action Button */}
      <Button
        onClick={handleAddToCart}
        disabled={isOutOfStock}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/95 font-bold text-xs uppercase tracking-widest py-4 transition-all duration-300 shadow-md rounded-xl disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
      >
        {isOutOfStock ? (
          'Agotado en esta selección'
        ) : (
          <span className="flex items-center justify-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            Añadir al Carrito
          </span>
        )}
      </Button>
    </div>
  );
}

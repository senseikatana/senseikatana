'use client';

import { Minus, Plus, Trash2, ShoppingBag, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useCartStore } from '@/store/cart';
import { useState } from 'react';

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleQuantityChange = (productId: string, variantId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId, variantId);
    } else {
      updateQuantity(productId, variantId, newQuantity);
    }
  };

  const handleCheckout = async () => {
    try {
      setIsCheckingOut(true);
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items,
          shippingMethod: 'shipment', // shipment (default) or collect
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Ocurrió un error al iniciar el pago con Stripe.');
      }
    } catch (error) {
      console.error('Error al tramitar checkout:', error);
      alert('Error al conectar con la pasarela de pagos.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  const total = getTotalPrice();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0 border-l border-stone-100">
        <SheetHeader className="p-5 border-b border-stone-100 bg-stone-50">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-stone-900 flex items-center gap-2 font-extrabold tracking-wide uppercase text-sm">
              <ShoppingBag className="h-5 w-5 text-amber-800" />
              Tu Carrito
            </SheetTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="text-stone-500 hover:text-stone-900"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 bg-stone-50/50">
            <ShoppingBag className="h-16 w-16 text-stone-200 mb-4" />
            <p className="text-stone-850 font-bold text-lg mb-1">Tu carrito está vacío</p>
            <p className="text-stone-500 text-xs text-center max-w-[240px] leading-relaxed">
              Explora nuestra colección y encuentra tus prendas favoritas.
            </p>
            <Button
              onClick={() => onOpenChange(false)}
              className="mt-6 bg-stone-900 hover:bg-amber-900 text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 transition"
            >
              Seguir Comprando
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 p-5 bg-stone-50/30">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.variantId}`}
                    className="flex gap-4 p-4 bg-white border border-stone-100 shadow-sm"
                  >
                    <div className="relative w-20 h-24 bg-stone-100 overflow-hidden flex-shrink-0 border border-stone-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-stone-900 text-sm line-clamp-1">
                          {item.title}
                        </h4>
                        <p className="text-stone-500 text-[10px] uppercase tracking-wider mt-0.5">
                          Talla: <span className="font-bold text-stone-700">{item.size}</span> | Color: <span className="font-bold text-stone-700">{item.color}</span>
                        </p>
                        <p className="text-amber-800 text-sm font-bold mt-1">
                          {item.price.toFixed(2)}€
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-stone-200 bg-stone-50">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 rounded-none border-r border-stone-200 text-stone-500 hover:text-stone-900"
                            onClick={() =>
                              handleQuantityChange(
                                item.productId,
                                item.variantId,
                                item.quantity - 1
                              )
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-xs font-bold text-stone-800">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 rounded-none border-l border-stone-200 text-stone-500 hover:text-stone-900"
                            onClick={() =>
                              handleQuantityChange(
                                item.productId,
                                item.variantId,
                                item.quantity + 1
                              )
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-rose-500 hover:text-rose-600 hover:bg-rose-50"
                          onClick={() => removeItem(item.productId, item.variantId)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-5 border-t border-stone-150 bg-white">
              <div className="flex justify-between items-center mb-4">
                <span className="text-stone-500 text-sm font-medium">Subtotal</span>
                <span className="text-xl font-extrabold text-stone-900">
                  {total.toFixed(2)}€
                </span>
              </div>

              <Button 
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-stone-900 hover:bg-amber-900 text-white font-bold text-xs uppercase tracking-widest py-3 transition shadow-md disabled:opacity-50"
              >
                {isCheckingOut ? 'Procesando...' : 'Proceder al Pago'}
              </Button>

              <div className="flex gap-2 mt-2">
                <Button
                  variant="outline"
                  className="flex-1 border-stone-200 text-stone-600 hover:bg-stone-50 font-semibold text-xs uppercase tracking-wider py-2"
                  onClick={() => onOpenChange(false)}
                >
                  Seguir Comprando
                </Button>
                <Button
                  variant="outline"
                  className="border-rose-100 text-rose-600 hover:bg-rose-50 hover:text-rose-700 py-2"
                  onClick={clearCart}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}


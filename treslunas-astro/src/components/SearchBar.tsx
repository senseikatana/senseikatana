'use client';

import { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Product } from '@/types';
import { ProductCard } from './ProductCard';

interface SearchBarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  products: Product[];
}

export function SearchBar({ open, onOpenChange, products }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useCallback(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.brand?.toLowerCase().includes(query)
    ).slice(0, 8);
  }, [searchQuery, products]);

  const results = filteredProducts();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[85vh] p-0 border border-border bg-card text-card-foreground">
        <DialogHeader className="p-5 border-b border-border bg-muted/30">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-foreground text-lg font-bold">
              Buscar productos
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="p-5 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="¿Qué estás buscando? (ej. mascara, perfume, etc.)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 h-12 bg-background border-input focus-visible:ring-ring text-base rounded-xl"
              autoFocus
            />
          </div>
        </div>

        <ScrollArea className="max-h-[50vh]">
          <div className="p-5">
            {searchQuery.trim() === '' ? (
              <div className="text-center py-16">
                <Search className="h-12 w-12 text-muted-foreground/45 mx-auto mb-4" />
                <p className="text-muted-foreground font-medium">
                  Escribe para buscar productos de la boutique...
                </p>
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground font-medium">
                  No se encontraron productos para &quot;{searchQuery}&quot;
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {results.map((product) => (
                  <div
                    key={product.id}
                    className="cursor-pointer"
                    onClick={() => {
                      onOpenChange(false);
                      setSearchQuery('');
                    }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

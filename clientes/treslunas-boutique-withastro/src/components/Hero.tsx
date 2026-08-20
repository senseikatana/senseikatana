'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

export function Hero({ onExploreClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-amber-200/30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-rose-200/30 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-orange-200/20 blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              Nueva Colección Primavera 2025
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-amber-900 leading-tight">
              Moda que{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-rose-500">
                brilla
              </span>{' '}
              como tú
            </h1>

            <p className="text-lg text-amber-700 mt-4 md:mt-6 max-w-xl mx-auto lg:mx-0">
              Descubre las últimas tendencias en nuestra tienda de moda en
              Cambrils. Ropa, accesorios y mucho más para expresar tu estilo
              único.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-6 md:mt-8 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 text-white"
                onClick={onExploreClick}
              >
                Explorar productos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-amber-300 text-amber-700 hover:bg-amber-50"
              >
                Ver ofertas
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 md:mt-12 pt-8 border-t border-amber-200/50">
              <div className="text-center lg:text-left">
                <p className="text-2xl md:text-3xl font-bold text-amber-900">
                  500+
                </p>
                <p className="text-sm text-amber-600">Productos</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl md:text-3xl font-bold text-amber-900">
                  15+
                </p>
                <p className="text-sm text-amber-600">Años de experiencia</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl md:text-3xl font-bold text-amber-900">
                  10k+
                </p>
                <p className="text-sm text-amber-600">Clientes felices</p>
              </div>
            </div>
          </div>

          {/* Image grid */}
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-amber-100 shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=500&fit=crop"
                    alt="Fashion model"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden bg-amber-100 shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=300&fit=crop"
                    alt="Fashion accessories"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square rounded-2xl overflow-hidden bg-amber-100 shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=300&fit=crop"
                    alt="Fashion clothing"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-amber-100 shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=500&fit=crop"
                    alt="Fashion style"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl p-4 border border-amber-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 text-xl">✓</span>
                </div>
                <div>
                  <p className="font-semibold text-amber-900">
                    Envío gratis
                  </p>
                  <p className="text-sm text-amber-600">
                    En pedidos +50€
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

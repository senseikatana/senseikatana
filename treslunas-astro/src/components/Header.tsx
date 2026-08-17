<<<<<<< HEAD
'use client';

import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/store/cart';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  onCartClick: () => void;
  onSearchClick?: () => void;
}

export function Header({ onCartClick, onSearchClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());

  const navLinks = [
    { href: '/#coleccion', label: 'Colección' },
    { href: '/#erika', label: 'Sobre Erika' },
    { href: 'https://wa.me/34600000000', label: 'Contacto' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-md shadow-sm transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <img 
              src="/logo.svg" 
              alt="3 Lunas Boutique" 
              className="h-12 w-auto transition-transform group-hover:scale-105 duration-300 dark:invert-[0.1]" 
            />
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-widest text-foreground uppercase leading-none">3 LUNAS</span>
              <span className="text-[8px] uppercase tracking-[0.4em] text-primary font-semibold mt-0.5">Boutique</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {onSearchClick && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onSearchClick}
                className="text-foreground hover:bg-accent"
              >
                <Search className="h-5 w-5" />
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={onCartClick}
              className="relative text-foreground hover:bg-accent"
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[9px] bg-primary text-primary-foreground border-0 font-bold">
                  {totalItems}
                </Badge>
              )}
            </Button>

            <ThemeToggle />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'md:hidden overflow-hidden transition-all duration-200 ease-in-out',
            mobileMenuOpen ? 'max-h-64 pb-4' : 'max-h-0'
          )}
        >
          <nav className="flex flex-col gap-2 pt-2 border-t border-border">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

=======
import React, { useState } from 'react';
import { TripleMoonLogo } from './TripleMoonLogo';
import { PageView, Category } from '../types';
import { Search, ShoppingBag, Menu, X, Sun, Moon, Palette, PhoneCall } from 'lucide-react';

interface HeaderProps {
  activePage: PageView;
  setActivePage: (page: PageView) => void;
  cartCount: number;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  onSelectCategory: (category: Category) => void;
  onOpenSearch: () => void;
  onOpenWhatsAppModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  setActivePage,
  cartCount,
  isDarkMode,
  setIsDarkMode,
  onSelectCategory,
  onOpenSearch,
  onOpenWhatsAppModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: PageView, category?: Category) => {
    setActivePage(page);
    if (category) {
      onSelectCategory(category);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-40 transition-colors duration-300 border-b ${
      isDarkMode 
        ? 'bg-[#0f0f10]/95 backdrop-blur-md border-neutral-800 text-white' 
        : 'bg-[#fcf9f8]/95 backdrop-blur-md border-neutral-200 text-[#1c1b1b]'
    }`}>
      {/* Top Banner Announcement */}
      <div className={`py-1.5 px-4 text-center text-xs font-sans-body tracking-wider uppercase transition-colors ${
        isDarkMode ? 'bg-[#92003a] text-white' : 'bg-[#92003a] text-white'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="hidden sm:inline-block">📍 Carrer Major, 12, Cambrils</span>
          <span className="mx-auto sm:mx-0 font-medium">✨ TIENDA FÍSICA EN CAMBRILS | Click & Collect & Envío Local en 24h</span>
          <button 
            onClick={onOpenWhatsAppModal}
            className="hidden md:flex items-center gap-1 hover:underline text-pink-100 cursor-pointer"
          >
            <PhoneCall className="w-3 h-3" /> Asesoría Erika
          </button>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Left Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-neutral-800/20 focus:outline-none"
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Left Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-sans-body font-medium tracking-wide">
          <button
            onClick={() => handleNavClick('home')}
            className={`hover:text-[#F62477] transition-colors py-1 ${
              activePage === 'home' ? 'text-[#92003a] font-bold border-b-2 border-[#92003a]' : ''
            }`}
          >
            Novedades
          </button>
          <button
            onClick={() => handleNavClick('catalog', 'Todos')}
            className={`hover:text-[#F62477] transition-colors py-1 ${
              activePage === 'catalog' ? 'text-[#92003a] font-bold border-b-2 border-[#92003a]' : ''
            }`}
          >
            Colección
          </button>
          <button
            onClick={() => handleNavClick('catalog', 'Vestidos')}
            className="hover:text-[#F62477] transition-colors py-1"
          >
            Vestidos
          </button>
          <button
            onClick={() => handleNavClick('catalog', 'Top & Blusas')}
            className="hover:text-[#F62477] transition-colors py-1"
          >
            Top & Blusas
          </button>
        </nav>

        {/* Center Brand Logo */}
        <div 
          onClick={() => handleNavClick('home')} 
          className="cursor-pointer flex items-center gap-2 group"
        >
          <TripleMoonLogo 
            variant={isDarkMode ? 'metallic' : 'metallic'} 
            size={42} 
            showText={true} 
            textClassName={isDarkMode ? 'text-white' : 'text-[#1c1b1b]'}
          />
        </div>

        {/* Right Desktop Nav & Utilities */}
        <div className="flex items-center gap-4">
          <nav className="hidden xl:flex items-center gap-6 text-sm font-sans-body font-medium tracking-wide mr-2">
            <button
              onClick={() => handleNavClick('catalog', 'Pantalones')}
              className="hover:text-[#F62477] transition-colors"
            >
              Pantalones
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'Accesorios')}
              className="hover:text-[#F62477] transition-colors"
            >
              Accesorios
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`hover:text-[#F62477] transition-colors py-1 ${
                activePage === 'about' ? 'text-[#92003a] font-bold border-b-2 border-[#92003a]' : ''
              }`}
            >
              Sobre Erika
            </button>
          </nav>

          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            className="p-2 rounded-full hover:bg-neutral-500/10 transition-colors"
            title="Buscar productos"
            aria-label="Buscar"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Design Guide Button */}
          <button
            onClick={() => handleNavClick('branding-guide')}
            className={`p-2 rounded-full transition-colors ${
              activePage === 'branding-guide' 
                ? 'bg-[#92003a] text-white' 
                : 'hover:bg-neutral-500/10 text-copper-gradient'
            }`}
            title="Guía de Marca & Assets"
          >
            <Palette className="w-5 h-5" />
          </button>

          {/* Theme Toggle (Dark / Light Mode) */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-neutral-500/10 transition-colors"
            title={isDarkMode ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-amber-300" /> : <Moon className="w-5 h-5 text-neutral-700" />}
          </button>

          {/* Shopping Cart Button */}
          <button
            onClick={() => handleNavClick('cart')}
            className="relative p-2 rounded-full hover:bg-neutral-500/10 transition-colors group"
            aria-label="Carrito de compras"
          >
            <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#F62477] text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-t ${
          isDarkMode ? 'bg-[#0f0f10] border-neutral-800' : 'bg-white border-neutral-200'
        } px-4 pt-3 pb-6 space-y-3 font-sans-body shadow-xl animate-fadeIn`}>
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-neutral-700/20">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left py-2 px-3 rounded hover:bg-[#92003a]/10 font-medium"
            >
              Novedades
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'Todos')}
              className="text-left py-2 px-3 rounded hover:bg-[#92003a]/10 font-medium"
            >
              Colección Completa
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'Vestidos')}
              className="text-left py-2 px-3 rounded hover:bg-[#92003a]/10"
            >
              Vestidos
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'Top & Blusas')}
              className="text-left py-2 px-3 rounded hover:bg-[#92003a]/10"
            >
              Top & Blusas
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'Pantalones')}
              className="text-left py-2 px-3 rounded hover:bg-[#92003a]/10"
            >
              Pantalones
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'Accesorios')}
              className="text-left py-2 px-3 rounded hover:bg-[#92003a]/10"
            >
              Accesorios & Joyería
            </button>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={() => handleNavClick('about')}
              className="text-left py-2 px-3 rounded hover:bg-[#92003a]/10 font-medium"
            >
              Sobre Erika & 3 Lunas
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left py-2 px-3 rounded hover:bg-[#92003a]/10 font-medium"
            >
              Contacto & Ubicación
            </button>
            <button
              onClick={() => handleNavClick('branding-guide')}
              className="text-left py-2 px-3 rounded hover:bg-[#92003a]/10 text-amber-500 font-medium flex items-center gap-2"
            >
              <Palette className="w-4 h-4" /> Guía de Marca DESIGN.md
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
>>>>>>> 76f4a539a2570bae39c1935cc2a93143ec497af7

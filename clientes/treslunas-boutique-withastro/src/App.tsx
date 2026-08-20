import React, { useState, useEffect } from 'react';
import { PageView, Category, Product, CartItem } from './types';
import { PRODUCTS } from './data/products';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { CatalogPage } from './components/CatalogPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { BrandingGuidePage } from './components/BrandingGuidePage';
import { NotFoundPage } from './components/NotFoundPage';
import { WhatsAppModal } from './components/WhatsAppModal';
import { SearchModal } from './components/SearchModal';

export default function App() {
  const [activePage, setActivePage] = useState<PageView>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category>('Todos');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(PRODUCTS[0]);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('3lunas_cart');
      return saved ? JSON.parse(saved) : [
        {
          product: PRODUCTS[0],
          selectedColor: 'Beige Natural',
          selectedSize: 'M',
          quantity: 1
        },
        {
          product: PRODUCTS[1],
          selectedColor: 'Negro Azabache',
          selectedSize: 'M',
          quantity: 1
        }
      ];
    } catch {
      return [];
    }
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [whatsAppModalOpen, setWhatsAppModalOpen] = useState<boolean>(false);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('3lunas_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Handle Add To Cart
  const handleAddToCart = (product: Product, size?: string, color?: string) => {
    const itemColor = color || product.colors[0]?.name || 'Standard';
    const itemSize = size || product.sizes[0] || 'M';

    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.product.id === product.id && i.selectedColor === itemColor && i.selectedSize === itemSize
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      } else {
        return [...prev, { product, selectedColor: itemColor, selectedSize: itemSize, quantity: 1 }];
      }
    });
  };

  const handleUpdateCartQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(index);
      return;
    }
    setCart((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setActivePage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className={`min-h-screen flex flex-col font-sans-body transition-colors duration-300 ${
      isDarkMode ? 'bg-[#0a0a0c] text-white' : 'bg-[#fcf9f8] text-[#1c1b1b]'
    }`}>
      {/* Top Sticky Header */}
      <Header
        activePage={activePage}
        setActivePage={(page) => {
          setActivePage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={cartCount}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onSelectCategory={setSelectedCategory}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenWhatsAppModal={() => setWhatsAppModalOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            products={PRODUCTS}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            setActivePage={setActivePage}
            onSelectCategory={setSelectedCategory}
            isDarkMode={isDarkMode}
            onOpenWhatsAppModal={() => setWhatsAppModalOpen(true)}
          />
        )}

        {activePage === 'catalog' && (
          <CatalogPage
            products={PRODUCTS}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            isDarkMode={isDarkMode}
          />
        )}

        {activePage === 'product-detail' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            allProducts={PRODUCTS}
            onAddToCart={handleAddToCart}
            onSelectProduct={handleSelectProduct}
            setActivePage={setActivePage}
            isDarkMode={isDarkMode}
            onOpenWhatsAppModal={() => setWhatsAppModalOpen(true)}
          />
        )}

        {activePage === 'cart' && (
          <CartPage
            cart={cart}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            setActivePage={setActivePage}
            isDarkMode={isDarkMode}
          />
        )}

        {activePage === 'checkout' && (
          <CheckoutPage
            cart={cart}
            onClearCart={() => setCart([])}
            setActivePage={setActivePage}
            isDarkMode={isDarkMode}
          />
        )}

        {activePage === 'about' && (
          <AboutPage
            setActivePage={setActivePage}
            isDarkMode={isDarkMode}
            onOpenWhatsAppModal={() => setWhatsAppModalOpen(true)}
          />
        )}

        {activePage === 'contact' && (
          <ContactPage isDarkMode={isDarkMode} />
        )}

        {activePage === 'branding-guide' && (
          <BrandingGuidePage isDarkMode={isDarkMode} />
        )}

        {activePage === '404' && (
          <NotFoundPage setActivePage={setActivePage} />
        )}
      </main>

      {/* Footer */}
      <Footer
        setActivePage={(page) => {
          setActivePage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isDarkMode={isDarkMode}
        onOpenWhatsAppModal={() => setWhatsAppModalOpen(true)}
      />

      {/* Modals */}
      <WhatsAppModal
        isOpen={whatsAppModalOpen}
        onClose={() => setWhatsAppModalOpen(false)}
      />

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        products={PRODUCTS}
        onSelectProduct={handleSelectProduct}
      />
    </div>
  );
}

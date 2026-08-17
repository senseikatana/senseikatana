'use client';

import { useState } from 'react';
import { Header } from './Header';
import { CartDrawer } from './CartDrawer';

export function AppLayout() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <Header onCartClick={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AuthGate } from '@/components/AuthGate';
import { DataProvider, useData } from '@/context/DataProvider';
import AssistantWidget from '@/components/AssistantWidget';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊', emoji: '📊' },
  { type: 'divider', label: 'Finanzas Personales' },
  { href: '/personal/ingresos', label: 'Ingresos', icon: '💰', emoji: '💰' },
  { href: '/personal/gastos-fijos', label: 'Gastos Fijos', icon: '📋', emoji: '📋' },
  { href: '/personal/gastos-variables', label: 'Gastos Variables', icon: '🛒', emoji: '🛒' },
  { href: '/personal/suscripciones', label: 'Suscripciones', icon: '🔄', emoji: '🔄' },
  { href: '/personal/registro-diario', label: 'Registro Diario', icon: '📝', emoji: '📝' },
  { type: 'divider', label: 'Finanzas Negocio' },
  { href: '/negocios/ingresos', label: 'Ingresos Negocio', icon: '💼', emoji: '💼' },
  { href: '/negocios/gastos', label: 'Gastos Negocio', icon: '🏭', emoji: '🏭' },
  { href: '/negocios/presupuesto', label: 'Presupuesto Negocio', icon: '📊', emoji: '📊' },
  { type: 'divider', label: 'Gestión' },
  { href: '/presupuestos', label: 'Presupuestos', icon: '🎯', emoji: '🎯' },
  { href: '/crm', label: 'CRM', icon: '🤝', emoji: '🤝' },
  { href: '/tickets', label: 'Tickets', icon: '🎫', emoji: '🎫' },
  { type: 'divider', label: 'Metas' },
  { href: '/metas', label: 'Metas Ahorro', icon: '🏦', emoji: '🏦' },
  { href: '/deudas', label: 'Deudas', icon: '💳', emoji: '💳' },
  { type: 'divider', label: 'Configuración' },
  { href: '/categorias', label: 'Categorías', icon: '🏷️', emoji: '🏷️' },
  { href: '/sincronizacion', label: 'Sincronización', icon: '☁️', emoji: '☁️' },
];

function SidebarContent({ pathname, onNavigate }) {
  return (
    <>
      <div className="p-4 border-b border-white/10">
        <Link href="/dashboard" className="flex items-center gap-3 no-underline" onClick={onNavigate}>
          <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center text-white font-bold text-lg">
            💰
          </div>
          <div>
            <h1 className="text-white font-bold text-base leading-tight">Finanzas App</h1>
            <p className="text-white/60 text-xs">Control total</p>
          </div>
        </Link>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-2">
        {NAV_ITEMS.map((item, i) => {
          if (item.type === 'divider') {
            return (
              <div key={i} className="px-4 pt-4 pb-1">
                <span className="text-white/40 text-xs uppercase tracking-wider">{item.label}</span>
              </div>
            );
          }
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm no-underline transition-all
                ${isActive 
                  ? 'bg-white/20 text-white font-semibold' 
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              onClick={onNavigate}
            >
              <span className="text-lg w-6 text-center">{item.emoji}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}

function AppShell({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading, error } = useData();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="text-4xl mb-4">☁️</div>
          <p className="text-muted-foreground">Sincronizando con la nube...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthGate>
      <div className="flex min-h-screen bg-background">
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`fixed left-0 top-0 h-full w-64 bg-primary z-50 flex flex-col transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
          <SidebarContent 
            pathname={pathname} 
            onNavigate={() => window.innerWidth < 768 && setSidebarOpen(false)} 
          />
        </aside>

        {/* Main content */}
        <div className="flex-1 md:ml-64">
          {/* Top bar */}
          <header className="sticky top-0 z-30 bg-white border-b border-border px-4 py-3 flex items-center justify-between">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              ☰
            </button>
            
            <div className="flex items-center gap-3">
              {user && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary-light text-white flex items-center justify-center text-sm font-bold">
                    {user.displayName?.[0] || user.email?.[0]?.toUpperCase() || '?'}
                  </div>
                  <span className="text-sm hidden sm:inline">{user.displayName || user.email}</span>
                </div>
              )}
            </div>
          </header>

          {/* Page content */}
          <main className="p-4 md:p-6 max-w-7xl mx-auto">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center gap-2">
                ⚠️ {error}
              </div>
            )}
            {children}
          </main>
        </div>

        {/* Assistant widget */}
        <AssistantWidget />
      </div>
    </AuthGate>
  );
}

export default function AppLayout({ children }) {
  return (
    <DataProvider>
      <AppShell>{children}</AppShell>
    </DataProvider>
  );
}

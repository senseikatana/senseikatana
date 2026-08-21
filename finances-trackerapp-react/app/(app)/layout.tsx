'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DataProvider, useData } from '@/context/DataProvider';
import AssistantWidget from '@/components/AssistantWidget';
import { AuthGate } from '@/components/AuthGate';

interface NavItem {
  href?: string;
  label: string;
  icon?: string;
  type?: 'divider';
}

const NAV_ITEMS: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { type: 'divider', label: 'Finanzas Personales' },
  { href: '/personal/ingresos', label: 'Ingresos', icon: '💰' },
  { href: '/personal/gastos-fijos', label: 'Gastos Fijos', icon: '📋' },
  { href: '/personal/gastos-variables', label: 'Gastos Variables', icon: '🛒' },
  { href: '/personal/suscripciones', label: 'Suscripciones', icon: '🔄' },
  { href: '/personal/registro-diario', label: 'Registro Diario', icon: '📝' },
  { type: 'divider', label: 'Finanzas Negocio' },
  { href: '/negocios/ingresos', label: 'Ingresos Negocio', icon: '💼' },
  { href: '/negocios/gastos', label: 'Gastos Negocio', icon: '🏭' },
  { type: 'divider', label: 'Gestion' },
  { href: '/presupuestos', label: 'Presupuestos', icon: '🎯' },
  { href: '/crm', label: 'CRM', icon: '🤝' },
  { href: '/tickets', label: 'Tickets', icon: '🎫' },
  { href: '/metas', label: 'Metas Ahorro', icon: '🏦' },
  { href: '/deudas', label: 'Deudas', icon: '💳' },
  { href: '/categorias', label: 'Categorias', icon: '🏷' },
  { href: '/sincronizacion', label: 'Sincronizacion', icon: '☁️' },
];

function SidebarContent({ pathname }: { pathname: string }) {
  return (
    <>
      <div className="p-4 border-b border-white/10">
        <Link href="/dashboard" className="flex items-center gap-3 no-underline">
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
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href!}
              className={`flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm no-underline transition-all
                ${isActive 
                  ? 'bg-white/20 text-white font-semibold' 
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
            >
              <span className="text-lg w-6 text-center">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}

function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout, saving } = useData();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setSidebarOpen(true);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`fixed left-0 top-0 h-full w-64 bg-primary z-50 flex flex-col transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <SidebarContent pathname={pathname || '/dashboard'} />
        
        {/* User info + logout */}
        <div className="p-4 border-t border-white/10 mt-auto">
          {user && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {user.displayName?.[0] || user.email?.[0]?.toUpperCase() || '?'}
                </div>
                <div className="min-w-0">
                  <div className="text-white text-xs font-medium truncate">{user.displayName || user.email}</div>
                </div>
              </div>
              <button 
                onClick={logout}
                className="text-white/60 hover:text-white text-lg px-2"
                title="Cerrar sesion"
              >
                🚪
              </button>
            </div>
          )}
          {saving && <div className="text-white/40 text-xs mt-2 text-center">Guardando...</div>}
        </div>
      </aside>

      <div className="flex-1 md:ml-64">
        <header className="sticky top-0 z-30 bg-white border-b border-border px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100">☰</button>
          <div className="text-sm text-muted-foreground">
            {user ? '✅ Sesion activa' : 'Modo demo'}
          </div>
        </header>
        <main className="p-4 md:p-6 max-w-7xl mx-auto">{children}</main>
      </div>

      <AssistantWidget />
    </div>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <DataProvider>
      <AuthGate>
        <AppShell>{children}</AppShell>
      </AuthGate>
    </DataProvider>
  );
}


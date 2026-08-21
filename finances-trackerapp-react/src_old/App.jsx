import { useState } from 'react';
import { useFirestoreData } from './hooks/useFirestoreData';
import { useAuth } from './hooks/useAuth';
import { INCOME_CATEGORIES, FIXED_CATEGORIES, EXPENSE_CATEGORIES } from './data/defaultData';
import { AuthGate } from './components/AuthGate';
import Dashboard from './components/Dashboard';
import Income from './components/Income';
import FixedExpenses from './components/FixedExpenses';
import VariableExpenses from './components/VariableExpenses';
import Subscriptions from './components/Subscriptions';
import DailyRegister from './components/DailyRegister';
import Budget from './components/Budget';
import SavingsGoals from './components/SavingsGoals';
import Debts from './components/Debts';
import Categories from './components/Categories';
import Assistant from './components/Assistant';

const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'income', label: 'Ingresos', icon: '💰' },
  { id: 'fixed', label: 'Gastos Fijos', icon: '📋' },
  { id: 'variable', label: 'Gastos Variables', icon: '🛒' },
  { id: 'subscriptions', label: 'Suscripciones', icon: '🔄' },
  { id: 'daily', label: 'Registro Diario', icon: '📝' },
  { id: 'budget', label: 'Presupuesto', icon: '🎯' },
  { id: 'categories', label: 'Categorías', icon: '🏷️' },
  { id: 'savings', label: 'Metas Ahorro', icon: '🏦' },
  { id: 'debts', label: 'Deudas', icon: '💳' },
];

export default function App() {
  const { user, logout } = useAuth();
  const [data, setData, { loading, saving, error }] = useFirestoreData();
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth > 480 : false;
  });

  const safeData = {
    ...data,
    incomeCategories: data.incomeCategories || INCOME_CATEGORIES,
    fixedCategories: data.fixedCategories || FIXED_CATEGORIES,
    expenseCategories: data.expenseCategories || EXPENSE_CATEGORIES,
  };

  const renderView = () => {
    if (loading) {
      return (
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'300px'}}>
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:'40px',marginBottom:'16px'}}>☁️</div>
            <p style={{color:'var(--text-light)'}}>Sincronizando con la nube...</p>
          </div>
        </div>
      );
    }
    switch (activeView) {
      case 'dashboard': return <Dashboard data={safeData} setData={setData} />;
      case 'income': return <Income data={safeData} setData={setData} />;
      case 'fixed': return <FixedExpenses data={safeData} setData={setData} />;
      case 'variable': return <VariableExpenses data={safeData} setData={setData} />;
      case 'subscriptions': return <Subscriptions data={safeData} setData={setData} />;
      case 'daily': return <DailyRegister data={safeData} setData={setData} />;
      case 'budget': return <Budget data={safeData} setData={setData} />;
      case 'categories': return <Categories data={safeData} setData={setData} />;
      case 'savings': return <SavingsGoals data={safeData} setData={setData} />;
      case 'debts': return <Debts data={safeData} setData={setData} />;
      default: return <Dashboard data={safeData} setData={setData} />;
    }
  };

  return (
    <AuthGate>
      <div className="app">
        {!sidebarOpen && (
          <button className="menu-toggle-btn" onClick={() => setSidebarOpen(true)} title="Mostrar menú">
            ☰
          </button>
        )}

        <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <a href="/" onClick={(e) => { e.preventDefault(); setActiveView('dashboard'); }} className="sidebar-logo-link">
              <svg className="logo-icon" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
              <div className="sidebar-title-group">
                <h1>Finanzas App</h1>
                <p>Control personal</p>
              </div>
            </a>
            <button className="sidebar-close-btn" onClick={() => setSidebarOpen(false)} title="Ocultar menú">
              ✕
            </button>
          </div>
          <nav className="sidebar-nav">
            {NAV.map(n => (
              <button
                key={n.id}
                className={`nav-item ${activeView === n.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveView(n.id);
                  if (window.innerWidth <= 480) {
                    setSidebarOpen(false);
                  }
                }}
              >
                <span className="nav-icon">{n.icon}</span>
                <span className="nav-label">{n.label}</span>
              </button>
            ))}
          </nav>
          <div style={{padding:'12px 20px',borderTop:'1px solid rgba(255,255,255,0.08)'}}>
            <button className="btn btn-ghost" style={{width:'100%',color:'rgba(255,255,255,0.6)'}} onClick={logout} aria-label="Cerrar sesión">
              <span style={{marginRight:'6px'}}>🚪</span>
              <span style={{fontSize:'12px'}}>Cerrar sesión</span>
            </button>
          </div>
          <div style={{padding:'16px',fontSize:'10px',opacity:0.4,textAlign:'center',marginTop:'auto'}}>
            v2.0 · Sincronizado ☁️
            {user?.displayName && <span style={{display:'block',opacity:0.6,marginTop:'4px'}}>👤 {user.displayName}</span>}
            {saving && <span style={{marginLeft:'8px',color:'var(--blue)'}}>⟳</span>}
            {error && <span style={{marginLeft:'8px',color:'var(--red)'}}>⚠</span>}
          </div>
        </aside>

        <main className={`main ${sidebarOpen ? 'sidebar-active' : ''}`}>
          {renderView()}
        </main>

        {sidebarOpen && (
          <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} />
        )}
      </div>

      <Assistant data={safeData} />
    </AuthGate>
  );
}
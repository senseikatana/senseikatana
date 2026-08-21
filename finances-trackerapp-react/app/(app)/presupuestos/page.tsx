// @ts-nocheck
'use client';
import { useState } from 'react';
import { useData } from '@/context/DataProvider';

export default function PresupuestosPage() {
  const { data, setData } = useData();
  const [tab, setTab] = useState('personal');
  const budget = tab === 'personal' ? (data.budget || []) : (data.businessBudget || []);
  const cur = data.settings?.currency || '€';

  const updatePlanned = (cat: string, val: string) => {
    setData((d: any) => {
      const u = { ...d };
      if (tab === 'personal') u.budget = d.budget.map((b: any) => b.category === cat ? { ...b, planned: Number(val) } : b);
      else u.businessBudget = d.businessBudget.map((b: any) => b.category === cat ? { ...b, planned: Number(val) } : b);
      return u;
    });
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button onClick={() => setTab('personal')} className={'px-4 py-2 rounded-lg font-medium ' + (tab === 'personal' ? 'bg-primary text-white' : 'bg-gray-100')}>👤 Personal</button>
        <button onClick={() => setTab('negocio')} className={'px-4 py-2 rounded-lg font-medium ' + (tab === 'negocio' ? 'bg-primary text-white' : 'bg-gray-100')}>💼 Negocio</button>
      </div>
      <div className="card">
        <h2 className="text-xl font-bold text-primary mb-4">🎯 Presupuesto {tab === 'personal' ? 'Personal' : 'Negocio'}</h2>
        <div className="overflow-x-auto">
          <table className="table">
            <thead><tr><th>Categoria</th><th className="text-right">Planificado</th><th className="text-right">Real</th><th className="text-right">Diferencia</th><th className="text-center">Estado</th></tr></thead>
            <tbody>
              {budget.map((b: any) => {
                let real = 0;
                if (tab === 'personal') {
                  real = (data.fixedExpenses || []).filter((e: any) => e.category === b.category).reduce((s: number, e: any) => s + Number(e.amount), 0)
                    + (data.variableExpenses || []).filter((e: any) => e.category === b.category).reduce((s: number, e: any) => s + Number(e.amount), 0)
                    + (data.dailyRegister || []).filter((e: any) => e.category === b.category).reduce((s: number, e: any) => s + Number(e.amount), 0);
                } else {
                  real = (data.businessExpenses || []).filter((e: any) => e.category === b.category).reduce((s: number, e: any) => s + Number(e.amount), 0);
                }
                const diff = real - b.planned;
                return (
                  <tr key={b.category}>
                    <td className="font-medium">{b.category}</td>
                    <td className="text-right"><input type="number" value={b.planned} onChange={e => updatePlanned(b.category, e.target.value)} className="input w-24 text-right" /></td>
                    <td className="text-right font-bold">{real.toFixed(2)}{cur}</td>
                    <td className="text-right" style={{ color: diff > 0 ? 'var(--color-red)' : 'var(--color-green)' }}>{diff >= 0 ? '+' : ''}{diff.toFixed(2)}{cur}</td>
                    <td className="text-center">{diff > 0 ? '❌' : '✅'}</td>
                  </tr>
                );
              })}
              {budget.length === 0 && <tr><td colSpan="5" className="text-center py-8 text-muted-foreground">Sin presupuesto definido</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

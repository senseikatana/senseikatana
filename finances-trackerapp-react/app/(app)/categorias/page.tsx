// @ts-nocheck
'use client';
import { useState } from 'react';
import { useData } from '@/context/DataProvider';
import { CrudTable } from '@/components/CrudTable';

export default function CategoriasPage() {
  const { data, setData } = useData();
  const [tab, setTab] = useState('income');
  const [newCat, setNewCat] = useState('');

  const cats = {
    income:{list:data.incomeCategories||[],label:'Ingresos'},
    fixed:{list:data.fixedCategories||[],label:'Gastos Fijos'},
    expense:{list:data.expenseCategories||[],label:'Gastos Variables'},
    bizInc:{list:data.businessIncomeCategories||[],label:'Ingresos Negocio'},
    bizExp:{list:data.businessExpenseCategories||[],label:'Gastos Negocio'},
  };
  const current = cats[tab];

  const addCat = () => {
    const t = newCat.trim();
    if (!t) return;
    if (current.list.some((c: string) => c.toLowerCase() === t.toLowerCase())) { alert('Ya existe'); return; }
    setNewCat('');
    setData((d: any) => {
      const u = { ...d };
      if (tab === 'income') u.incomeCategories = [...d.incomeCategories, t];
      else if (tab === 'fixed') u.fixedCategories = [...d.fixedCategories, t];
      else if (tab === 'expense') u.expenseCategories = [...d.expenseCategories, t];
      else if (tab === 'bizInc') u.businessIncomeCategories = [...d.businessIncomeCategories, t];
      else u.businessExpenseCategories = [...d.businessExpenseCategories, t];
      return u;
    });
  };

  const renameCat = (oldName: string) => {
    const n = prompt('Nuevo nombre para "' + oldName + '":', oldName);
    if (!n || n === oldName) return;
    const newName = n.trim();
    if (current.list.some((c: string) => c.toLowerCase() === newName.toLowerCase() && c !== oldName)) return;
    setData((d: any) => {
      const u = { ...d };
      if (tab === 'income') u.incomeCategories = d.incomeCategories.map((c: string) => c === oldName ? newName : c);
      else if (tab === 'fixed') u.fixedCategories = d.fixedCategories.map((c: string) => c === oldName ? newName : c);
      else if (tab === 'expense') u.expenseCategories = d.expenseCategories.map((c: string) => c === oldName ? newName : c);
      else if (tab === 'bizInc') u.businessIncomeCategories = d.businessIncomeCategories.map((c: string) => c === oldName ? newName : c);
      else u.businessExpenseCategories = d.businessExpenseCategories.map((c: string) => c === oldName ? newName : c);
      return u;
    });
  };

  const deleteCat = (name: string) => {
    if (!confirm('Eliminar "' + name + '"?')) return;
    setData((d: any) => {
      const u = { ...d };
      if (tab === 'income') u.incomeCategories = d.incomeCategories.filter((c: string) => c !== name);
      else if (tab === 'fixed') u.fixedCategories = d.fixedCategories.filter((c: string) => c !== name);
      else if (tab === 'expense') u.expenseCategories = d.expenseCategories.filter((c: string) => c !== name);
      else if (tab === 'bizInc') u.businessIncomeCategories = d.businessIncomeCategories.filter((c: string) => c !== name);
      else u.businessExpenseCategories = d.businessExpenseCategories.filter((c: string) => c !== name);
      return u;
    });
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold text-primary mb-4">🏷️ Gestion de Categorias</h2>
      <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-border">
        {Object.keys(cats).map(k => (
          <button key={k} onClick={() => setTab(k)} className={'px-3 py-1 rounded-lg text-sm font-medium ' + (tab === k ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')}>
            {cats[k].label}
          </button>
        ))}
      </div>
      <div className="flex gap-2 mb-4">
        <input type="text" placeholder={'Nueva categoria ' + current.label} value={newCat} onChange={e => setNewCat(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') addCat() }} className="input flex-1" />
        <button onClick={addCat} className="px-4 py-2 rounded-lg bg-primary text-white font-medium">Anadir</button>
      </div>
      <CrudTable
        data={current.list.map((c: string, i: number) => ({ id: i, name: c }))}
        columns={[{ key: 'name', label: 'Categoria', format: (i: any) => <strong>{i.name}</strong> }]}
        onDelete={(i: any) => deleteCat(i.name)}
        onDeleteBatch={(batch: any[]) => batch.forEach((i: any) => deleteCat(i.name))}
        emptyMessage="Sin categorias"
      />
    </div>
  );
}

'use client';
import { useState } from 'react';
import { useData } from '@/context/DataProvider';
import Modal from '@/components/Modal';
import { CrudTable } from '@/components/CrudTable';

export default function PersonalIncomePage() {
  const { data, setData } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [form, setForm] = useState({ date: '', category: 'Otros', concept: '', amount: '', notes: '' });

  const categories = data.incomeCategories || [];
  const items = data.income || [];
  const cur = data.settings?.currency || '€';

  const openCreate = () => {
    setEditingItem(null);
    setForm({ date: new Date().toISOString().split('T')[0], category: categories[0] || 'Otros', concept: '', amount: '', notes: '' });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setForm({ date: item.date, category: item.category, concept: item.concept, amount: item.amount.toString(), notes: item.notes || '' });
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.concept.trim() || Number(form.amount) <= 0) return;
    const payload = { ...form, amount: Number(form.amount) };

    if (editingItem) {
      setData((d) => ({
        ...d,
        income: d.income.map((i) => i.id === editingItem.id ? { ...i, ...payload } : i),
      }));
    } else {
      const newId = Math.max(0, ...items.map(i => i.id)) + 1;
      setData((d) => ({
        ...d,
        income: [...d.income, { id: newId, ...payload }],
      }));
    }
    setModalOpen(false);
  };

  const handleDelete = (item) => {
    if (confirm('Eliminar este ingreso?')) {
      setData((d) => ({ ...d, income: d.income.filter((i) => i.id !== item.id) }));
    }
  };

  const handleDeleteBatch = (itemsToDelete) => {
    const ids = new Set(itemsToDelete.map(i => i.id));
    setData((d) => ({ ...d, income: d.income.filter((i) => !ids.has(i.id)) }));
  };

  const total = items.reduce((s, i) => s + Number(i.amount), 0);

  const columns = [
    { key: 'date', label: 'Fecha' },
    { key: 'category', label: 'Categoria', format: (item) => (
      <span className="badge" style={{background:'var(--color-green-light)', color:'var(--color-green)'}}>{item.category}</span>
    )},
    { key: 'concept', label: 'Concepto', format: (item) => <strong>{item.concept}</strong> },
    { key: 'amount', label: 'Importe', className: 'text-right font-semibold', headerClassName: 'text-right', format: (item) => (
      <span className="text-green">{Number(item.amount).toFixed(2)}{cur}</span>
    )},
    { key: 'notes', label: 'Notas', className: 'text-muted-foreground text-sm', hideOnMobile: true },
  ];

  return (
    <div>
      <CrudTable
        data={items}
        columns={columns}
        onEdit={openEdit}
        onDelete={handleDelete}
        onDeleteBatch={handleDeleteBatch}
        onAdd={openCreate}
        addLabel="+ Nuevo Ingreso"
        emptyMessage="Sin ingresos registrados"
        title="Ingresos Personales"
        titleIcon="💰"
        accentColor="var(--color-green)"
        totalRow={
          <tr className="font-bold" style={{background:'var(--color-green-light)'}}>
            <td colSpan="3">TOTAL INGRESOS</td>
            <td className="text-right text-green">{total.toFixed(2)}{cur}</td>
            <td className="hidden md:table-cell"></td>
          </tr>
        }
      />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingItem ? 'Editar Ingreso' : 'Nuevo Ingreso'}>
        <form onSubmit={handleSave}>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Fecha</label>
            <input type="date" required value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="input" />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Categoria</label>
            <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="input">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Concepto</label>
            <input type="text" required placeholder="Nomina, Freelance..." value={form.concept} onChange={e => setForm({...form, concept: e.target.value})} className="input" />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Importe ({cur})</label>
            <input type="number" step="0.01" min="0.01" required placeholder="0.00" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} className="input" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Notas</label>
            <textarea placeholder="Notas..." value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} className="input" rows={2} />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-lg text-muted-foreground hover:bg-gray-100">Cancelar</button>
            <button type="submit" className="px-4 py-2 rounded-lg font-medium text-white" style={{background:'var(--color-green)'}}>Guardar</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}


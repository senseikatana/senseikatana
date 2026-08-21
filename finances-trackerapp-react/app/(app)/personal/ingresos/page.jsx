'use client';
import { useState } from 'react';
import { useData } from '@/context/DataProvider';
import Modal from '@/components/Modal';

export default function PersonalIncomePage() {
  const { data, setData } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ date: '', category: 'Otros', concept: '', amount: '', notes: '' });

  var categories = data.incomeCategories || [];
  var items = data.income || [];
  var currency = data.settings?.currency || '€';

  var openCreate = function() {
    setEditingItem(null);
    setForm({ date: new Date().toISOString().split('T')[0], category: categories[0] || 'Otros', concept: '', amount: '', notes: '' });
    setModalOpen(true);
  };

  var openEdit = function(item) { setEditingItem(item); setForm({ ...item, amount: item.amount.toString() }); setModalOpen(true); };

  var handleSave = function(e) {
    e.preventDefault();
    if (!form.concept.trim() || Number(form.amount) <= 0) { alert('Introduce concepto y importe válido.'); return; }
    var payload = { ...form, amount: Number(form.amount) };
    if (editingItem) {
      setData(function(d) { return { ...d, income: items.map(function(i) { return i.id === editingItem.id ? { ...i, ...payload } : i; }) }; });
    } else {
      var newId = Math.max(0, ...items.map(function(i) { return i.id; })) + 1;
      setData(function(d) { return { ...d, income: items.concat([{ id: newId, ...payload }]) }; });
    }
    setModalOpen(false);
  };

  var total = items.reduce(function(s, i) { return s + Number(i.amount); }, 0);

  return (
    <div>
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-primary">💰 Ingresos Personales</h2>
          <button onClick={openCreate} className="px-4 py-2 rounded-lg font-medium text-white" style={{background:'var(--color-green)'}}>+ Nuevo</button>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead><tr><th>Fecha</th><th>Categoría</th><th>Concepto</th><th className="text-right">Importe</th><th>Notas</th><th className="text-center">Acciones</th></tr></thead>
            <tbody>
              {items.map(function(i) {
                return (
                  <tr key={i.id}>
                    <td>{i.date}</td>
                    <td><span className="badge" style={{background:'var(--color-green-light)',color:'var(--color-green)'}}>{i.category}</span></td>
                    <td><strong>{i.concept}</strong></td>
                    <td className="text-right font-semibold text-green">{Number(i.amount).toFixed(2)}{currency}</td>
                    <td className="text-muted-foreground text-sm">{i.notes || '—'}</td>
                    <td className="text-center"><div className="inline-flex gap-2"><button onClick={function(){openEdit(i)}} className="btn btn-sm">✏️</button><button onClick={function(){if(confirm('¿Eliminar?'))setData(function(d){return{...d,income:items.filter(function(x){return x.id!==i.id;})}})}} className="btn btn-sm text-red">✕</button></div></td>
                  </tr>
                );
              })}
              {items.length===0 && <tr><td colSpan="6" className="text-center py-8 text-muted-foreground">Sin ingresos</td></tr>}
            </tbody>
            <tfoot><tr className="font-bold" style={{background:'var(--color-green-light)'}}><td colSpan="3">TOTAL</td><td className="text-right text-green">{total.toFixed(2)}{currency}</td><td colSpan="2"></td></tr></tfoot>
          </table>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={function(){setModalOpen(false)}} title={editingItem?'Editar Ingreso':'Nuevo Ingreso'}>
        <form onSubmit={handleSave}>
          <div className="mb-3"><label className="block text-sm font-medium mb-1">Fecha</label><input type="date" required value={form.date} onChange={function(e){setForm({...form,date:e.target.value})}} className="input" /></div>
          <div className="mb-3"><label className="block text-sm font-medium mb-1">Categoría</label><select value={form.category} onChange={function(e){setForm({...form,category:e.target.value})}} className="input">{categories.map(function(c){return<option key={c} value={c}>{c}</option>})}</select></div>
          <div className="mb-3"><label className="block text-sm font-medium mb-1">Concepto</label><input type="text" required placeholder="Nómina, Freelance..." value={form.concept} onChange={function(e){setForm({...form,concept:e.target.value})}} className="input" /></div>
          <div className="mb-3"><label className="block text-sm font-medium mb-1">Importe ({currency})</label><input type="number" step="0.01" min="0.01" required placeholder="0.00" value={form.amount} onChange={function(e){setForm({...form,amount:e.target.value})}} className="input" /></div>
          <div className="mb-4"><label className="block text-sm font-medium mb-1">Notas</label><textarea placeholder="Notas..." value={form.notes} onChange={function(e){setForm({...form,notes:e.target.value})}} className="input" rows={2} /></div>
          <div className="flex justify-end gap-2"><button type="button" onClick={function(){setModalOpen(false)}} className="px-4 py-2 rounded-lg text-muted-foreground hover:bg-gray-100">Cancelar</button><button type="submit" className="px-4 py-2 rounded-lg font-medium text-white" style={{background:'var(--color-green)'}}>Guardar</button></div>
        </form>
      </Modal>
    </div>
  );
}

'use client';
import { useState } from 'react';
import { useData } from '@/context/DataProvider';
import Modal from '@/components/Modal';

export default function FixedExpensesPage() {
  const { data, setData } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ category: 'Vivienda', concept: '', provider: '', amount: '', dueDate: 1, paid: false });

  var categories = data.fixedCategories || [];
  var items = data.fixedExpenses || [];
  var currency = data.settings?.currency || '€';

  var openCreate = function() {
    setEditingItem(null);
    setForm({ category: 'Vivienda', concept: '', provider: '', amount: '', dueDate: 1, paid: false });
    setModalOpen(true);
  };

  var openEdit = function(item) { setEditingItem(item); setForm({ ...item, amount: item.amount.toString() }); setModalOpen(true); };

  var handleSave = function(e) {
    e.preventDefault();
    if (!form.concept.trim() || Number(form.amount) <= 0) { alert('Introduce concepto y importe válido.'); return; }
    var payload = { ...form, amount: Number(form.amount), dueDate: Number(form.dueDate) };
    if (editingItem) {
      setData(function(d) { return { ...d, fixedExpenses: items.map(function(i) { return i.id === editingItem.id ? { ...i, ...payload } : i; }) }; });
    } else {
      var newId = Math.max(0, ...items.map(function(i) { return i.id; })) + 1;
      setData(function(d) { return { ...d, fixedExpenses: items.concat([{ id: newId, ...payload }]) }; });
    }
    setModalOpen(false);
  };

  var remove = function(id) { if (confirm('¿Eliminar este gasto fijo?')) setData(function(d) { return { ...d, fixedExpenses: items.filter(function(i) { return i.id !== id; }) }; }); };
  var togglePaid = function(id) { setData(function(d) { return { ...d, fixedExpenses: items.map(function(i) { return i.id === id ? { ...i, paid: !i.paid } : i; }) }; }); };
  var total = items.reduce(function(s, e) { return s + Number(e.amount); }, 0);
  var paid = items.filter(function(e) { return e.paid; }).reduce(function(s, e) { return s + Number(e.amount); }, 0);

  return (
    <div>
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-primary">📋 Gastos Fijos Mensuales</h2>
          <button onClick={openCreate} className="px-4 py-2 rounded-lg font-medium text-white" style={{background:'var(--color-blue)'}}>+ Nuevo</button>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead><tr><th>Categoría</th><th>Concepto</th><th>Proveedor</th><th className="text-right">Importe</th><th className="text-center">Día</th><th className="text-center">Pagado</th><th className="text-center">Acciones</th></tr></thead>
            <tbody>
              {items.map(function(e) {
                return (
                  <tr key={e.id} className={e.paid ? 'opacity-60' : ''}>
                    <td><span className="badge" style={{background:'var(--color-blue-light)',color:'var(--color-blue)'}}>{e.category}</span></td>
                    <td><strong>{e.concept}</strong></td>
                    <td>{e.provider || '—'}</td>
                    <td className="text-right font-semibold text-red">{Number(e.amount).toFixed(2)}{currency}</td>
                    <td className="text-center">Día {e.dueDate}</td>
                    <td className="text-center"><input type="checkbox" checked={e.paid} onChange={function(){togglePaid(e.id)}} className="w-4 h-4 cursor-pointer" /></td>
                    <td className="text-center"><div className="inline-flex gap-2"><button onClick={function(){openEdit(e)}} className="btn btn-sm">✏️</button><button onClick={function(){remove(e.id)}} className="btn btn-sm text-red">✕</button></div></td>
                  </tr>
                );
              })}
              {items.length===0 && <tr><td colSpan="7" className="text-center py-8 text-muted-foreground">Sin gastos fijos</td></tr>}
            </tbody>
            <tfoot><tr className="font-bold" style={{background:'var(--color-blue-light)'}}><td colSpan="3">TOTAL GASTOS FIJOS</td><td className="text-right text-red">{total.toFixed(2)}{currency}</td><td colSpan="3" className="text-sm text-muted-foreground">Pagado: {paid.toFixed(2)}{currency}</td></tr></tfoot>
          </table>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={function(){setModalOpen(false)}} title={editingItem?'Editar Gasto Fijo':'Nuevo Gasto Fijo'}>
        <form onSubmit={handleSave}>
          <div className="mb-3"><label className="block text-sm font-medium mb-1">Categoría</label><select value={form.category} onChange={function(e){setForm({...form,category:e.target.value})}} className="input">{categories.map(function(c){return<option key={c} value={c}>{c}</option>})}</select></div>
          <div className="mb-3"><label className="block text-sm font-medium mb-1">Concepto</label><input type="text" required placeholder="Alquiler, Luz..." value={form.concept} onChange={function(e){setForm({...form,concept:e.target.value})}} className="input" /></div>
          <div className="mb-3"><label className="block text-sm font-medium mb-1">Proveedor</label><input type="text" placeholder="Iberdrola, Vodafone..." value={form.provider} onChange={function(e){setForm({...form,provider:e.target.value})}} className="input" /></div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div><label className="block text-sm font-medium mb-1">Importe ({currency})</label><input type="number" step="0.01" min="0.01" required placeholder="0.00" value={form.amount} onChange={function(e){setForm({...form,amount:e.target.value})}} className="input" /></div>
            <div><label className="block text-sm font-medium mb-1">Día de cobro</label><input type="number" min="1" max="31" value={form.dueDate} onChange={function(e){setForm({...form,dueDate:e.target.value})}} className="input" /></div>
          </div>
          <div className="flex justify-end gap-2"><button type="button" onClick={function(){setModalOpen(false)}} className="px-4 py-2 rounded-lg text-muted-foreground hover:bg-gray-100">Cancelar</button><button type="submit" className="px-4 py-2 rounded-lg font-medium text-white" style={{background:'var(--color-blue)'}}>Guardar</button></div>
        </form>
      </Modal>
    </div>
  );
}

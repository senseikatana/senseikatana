import { useState } from 'react';
import Modal from './Modal';

export default function VariableExpenses({ data, setData }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ date: '', category: 'Otros', concept: '', amount: '', necessary: true, notes: '' });

  const categories = data.expenseCategories || [];

  const openCreateModal = () => {
    setEditingItem(null);
    setForm({ date: new Date().toISOString().split('T')[0], category: categories[0] || 'Otros', concept: '', amount: '', necessary: true, notes: '' });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setForm({ ...item, amount: item.amount.toString() });
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.concept.trim() || Number(form.amount) <= 0) {
      alert('Por favor, introduce un concepto y un importe válido.');
      return;
    }

    const payload = {
      ...form,
      amount: Number(form.amount),
    };

    if (editingItem) {
      setData(d => ({
        ...d,
        variableExpenses: d.variableExpenses.map(e => e.id === editingItem.id ? { ...e, ...payload } : e)
      }));
    } else {
      const newId = Math.max(...data.variableExpenses.map(e => e.id), 0) + 1;
      setData(d => ({
        ...d,
        variableExpenses: [...d.variableExpenses, { id: newId, ...payload }]
      }));
    }
    setModalOpen(false);
  };

  const removeRow = (id) => {
    if (confirm('¿Estás seguro de que quieres eliminar este gasto variable?')) {
      setData(d => ({ ...d, variableExpenses: d.variableExpenses.filter(e => e.id !== id) }));
    }
  };

  const toggleNecessary = (id, currentVal) => {
    setData(d => ({
      ...d,
      variableExpenses: d.variableExpenses.map(e => e.id === id ? { ...e, necessary: !currentVal } : e)
    }));
  };

  const total = data.variableExpenses.reduce((s, e) => s + Number(e.amount), 0);
  const necessary = data.variableExpenses.filter(e => e.necessary).reduce((s, e) => s + Number(e.amount), 0);

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <span className="card-title">Gastos Variables</span>
          <button className="btn btn-primary" onClick={openCreateModal}>+ Añadir Gasto Variable</button>
        </div>
        
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Categoría</th>
                <th>Concepto</th>
                <th className="text-right">Importe</th>
                <th className="text-center" style={{ width: '100px' }}>Necesario</th>
                <th>Notas</th>
                <th className="text-center" style={{ width: '120px' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.variableExpenses.map(e => (
                <tr key={e.id}>
                  <td>{e.date}</td>
                  <td><span className="badge badge-orange">{e.category}</span></td>
                  <td><strong>{e.concept}</strong></td>
                  <td className="text-right text-red" style={{ fontWeight: '600' }}>{Number(e.amount).toFixed(2)}€</td>
                  <td className="text-center">
                    <input 
                      type="checkbox" 
                      checked={e.necessary} 
                      onChange={() => toggleNecessary(e.id, e.necessary)} 
                      style={{ width: 'auto', transform: 'scale(1.2)', cursor: 'pointer' }} 
                    />
                  </td>
                  <td><span className="text-muted">{e.notes || '—'}</span></td>
                  <td className="text-center">
                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => openEditModal(e)}>✏️</button>
                      <button className="btn btn-ghost btn-sm text-red" onClick={() => removeRow(e.id)}>✕</button>
                    </div>
                  </td>
                </tr>
              ))}
              {data.variableExpenses.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-light)' }}>
                    No hay gastos variables registrados. ¡Añade uno!
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr style={{ background: 'var(--orange-light)', fontWeight: '700' }}>
                <td colSpan="3">TOTAL GASTOS VARIABLES</td>
                <td className="text-right text-red">{total.toFixed(2)}€</td>
                <td colSpan="3" style={{ fontSize: '12px' }}>
                  Necesario: {necessary.toFixed(2)}€ · Capricho: {(total-necessary).toFixed(2)}€
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingItem ? "Editar Gasto Variable" : "Nuevo Gasto Variable"}>
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label>Fecha</label>
            <input type="date" required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Categoría</label>
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Concepto</label>
            <input type="text" required placeholder="Ej. Supermercado, Cine, Gasolina..." value={form.concept} onChange={e => setForm({ ...form, concept: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Importe (€)</label>
            <input type="number" step="0.01" min="0.01" required placeholder="0.00" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
          </div>
          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
            <input type="checkbox" id="necessaryCheck" checked={form.necessary} onChange={e => setForm({ ...form, necessary: e.target.checked })} style={{ width: 'auto' }} />
            <label htmlFor="necessaryCheck" style={{ margin: 0, cursor: 'pointer' }}>Gasto de primera necesidad</label>
          </div>
          <div className="form-group">
            <label>Notas</label>
            <textarea placeholder="Notas adicionales..." value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} style={{ height: '60px', resize: 'vertical' }} />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={() => setModalOpen(false)}>Cancelar</button>
            <button type="submit" className="btn btn-primary">Guardar</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

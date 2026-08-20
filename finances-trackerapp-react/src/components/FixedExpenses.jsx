import { useState } from 'react';
import Modal from './Modal';

export default function FixedExpenses({ data, setData }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ category: 'Otros', concept: '', provider: '', amount: '', dueDate: 1, paid: false });

  const categories = data.fixedCategories || [];

  const openCreateModal = () => {
    setEditingItem(null);
    setForm({ category: categories[0] || 'Otros', concept: '', provider: '', amount: '', dueDate: 1, paid: false });
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
      dueDate: Number(form.dueDate),
    };

    if (editingItem) {
      setData(d => ({
        ...d,
        fixedExpenses: d.fixedExpenses.map(e => e.id === editingItem.id ? { ...e, ...payload } : e)
      }));
    } else {
      const newId = Math.max(...data.fixedExpenses.map(e => e.id), 0) + 1;
      setData(d => ({
        ...d,
        fixedExpenses: [...d.fixedExpenses, { id: newId, ...payload }]
      }));
    }
    setModalOpen(false);
  };

  const removeRow = (id) => {
    if (confirm('¿Estás seguro de que quieres eliminar este gasto fijo?')) {
      setData(d => ({ ...d, fixedExpenses: d.fixedExpenses.filter(e => e.id !== id) }));
    }
  };

  const togglePaid = (id, currentVal) => {
    setData(d => ({
      ...d,
      fixedExpenses: d.fixedExpenses.map(e => e.id === id ? { ...e, paid: !currentVal } : e)
    }));
  };

  const total = data.fixedExpenses.reduce((s, e) => s + Number(e.amount), 0);
  const paid = data.fixedExpenses.filter(e => e.paid).reduce((s, e) => s + Number(e.amount), 0);

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <span className="card-title">Gastos Fijos Mensuales</span>
          <button className="btn btn-primary" onClick={openCreateModal}>+ Añadir Gasto Fijo</button>
        </div>
        
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Categoría</th>
                <th>Concepto</th>
                <th>Proveedor</th>
                <th className="text-right">Importe</th>
                <th className="text-center">Día Pago</th>
                <th className="text-center" style={{ width: '80px' }}>Pagado</th>
                <th className="text-center" style={{ width: '120px' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.fixedExpenses.map(e => (
                <tr key={e.id} style={e.paid ? { opacity: 0.6 } : {}}>
                  <td><span className="badge badge-blue">{e.category}</span></td>
                  <td><strong>{e.concept}</strong></td>
                  <td>{e.provider || '—'}</td>
                  <td className="text-right text-red" style={{ fontWeight: '600' }}>{Number(e.amount).toFixed(2)}€</td>
                  <td className="text-center">Día {e.dueDate}</td>
                  <td className="text-center">
                    <input 
                      type="checkbox" 
                      checked={e.paid} 
                      onChange={() => togglePaid(e.id, e.paid)} 
                      style={{ width: 'auto', transform: 'scale(1.2)', cursor: 'pointer' }} 
                    />
                  </td>
                  <td className="text-center">
                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => openEditModal(e)}>✏️</button>
                      <button className="btn btn-ghost btn-sm text-red" onClick={() => removeRow(e.id)}>✕</button>
                    </div>
                  </td>
                </tr>
              ))}
              {data.fixedExpenses.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-light)' }}>
                    No hay gastos fijos registrados. ¡Añade uno!
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr style={{ background: 'var(--blue-light)', fontWeight: '700' }}>
                <td colSpan="3">TOTAL GASTOS FIJOS</td>
                <td className="text-right text-red">{total.toFixed(2)}€</td>
                <td colSpan="3" style={{ fontSize: '12px' }}>
                  Pagado: {paid.toFixed(2)}€ / {total > 0 ? ((paid/total)*100).toFixed(0) : 0}%
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingItem ? "Editar Gasto Fijo" : "Nuevo Gasto Fijo"}>
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label>Categoría</label>
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Concepto</label>
            <input type="text" required placeholder="Ej. Alquiler, Luz, Internet..." value={form.concept} onChange={e => setForm({ ...form, concept: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Proveedor</label>
            <input type="text" placeholder="Ej. Iberdrola, Vodafone..." value={form.provider} onChange={e => setForm({ ...form, provider: e.target.value })} />
          </div>
          <div className="form-row" style={{ gap: '10px' }}>
            <div className="form-group" style={{ flex: '1' }}>
              <label>Importe (€)</label>
              <input type="number" step="0.01" min="0.01" required placeholder="0.00" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
            </div>
            <div className="form-group" style={{ flex: '1' }}>
              <label>Día de Pago (1-31)</label>
              <input type="number" min="1" max="31" required value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} />
            </div>
          </div>
          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
            <input type="checkbox" id="paidCheck" checked={form.paid} onChange={e => setForm({ ...form, paid: e.target.checked })} style={{ width: 'auto' }} />
            <label htmlFor="paidCheck" style={{ margin: 0, cursor: 'pointer' }}>Marcar como pagado este mes</label>
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

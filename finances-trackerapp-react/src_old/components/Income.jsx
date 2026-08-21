import { useState } from 'react';
import Modal from './Modal';

export default function Income({ data, setData }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ date: '', category: 'Otros', concept: '', amount: '', notes: '' });

  const categories = data.incomeCategories || [];

  const openCreateModal = () => {
    setEditingItem(null);
    setForm({ date: new Date().toISOString().split('T')[0], category: categories[0] || 'Otros', concept: '', amount: '', notes: '' });
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

    if (editingItem) {
      setData(d => ({
        ...d,
        income: d.income.map(i => i.id === editingItem.id ? { ...i, ...form, amount: Number(form.amount) } : i)
      }));
    } else {
      const newId = Math.max(...data.income.map(i => i.id), 0) + 1;
      setData(d => ({
        ...d,
        income: [...d.income, { id: newId, ...form, amount: Number(form.amount) }]
      }));
    }
    setModalOpen(false);
  };

  const removeRow = (id) => {
    if (confirm('¿Estás seguro de que quieres eliminar este ingreso?')) {
      setData(d => ({ ...d, income: d.income.filter(i => i.id !== id) }));
    }
  };

  const total = data.income.reduce((s, i) => s + Number(i.amount), 0);

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <span className="card-title">Ingresos</span>
          <button className="btn btn-primary" onClick={openCreateModal}>+ Añadir Ingreso</button>
        </div>
        
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Categoría</th>
                <th>Concepto</th>
                <th className="text-right">Importe</th>
                <th>Notas</th>
                <th className="text-center" style={{ width: '120px' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.income.map(i => (
                <tr key={i.id}>
                  <td>{i.date}</td>
                  <td><span className="badge badge-green">{i.category}</span></td>
                  <td><strong>{i.concept}</strong></td>
                  <td className="text-right text-green" style={{ fontWeight: '600' }}>{Number(i.amount).toFixed(2)}€</td>
                  <td><span className="text-muted">{i.notes || '—'}</span></td>
                  <td className="text-center">
                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => openEditModal(i)}>✏️</button>
                      <button className="btn btn-ghost btn-sm text-red" onClick={() => removeRow(i.id)}>✕</button>
                    </div>
                  </td>
                </tr>
              ))}
              {data.income.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-light)' }}>
                    No hay ingresos registrados. ¡Añade uno!
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr style={{ background: 'var(--green-light)', fontWeight: '700' }}>
                <td colSpan="3">TOTAL INGRESOS</td>
                <td className="text-right text-green">{total.toFixed(2)}€</td>
                <td colSpan="2"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingItem ? "Editar Ingreso" : "Nuevo Ingreso"}>
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
            <input type="text" required placeholder="Ej. Nómina mensual, Freelance..." value={form.concept} onChange={e => setForm({ ...form, concept: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Importe (€)</label>
            <input type="number" step="0.01" min="0.01" required placeholder="0.00" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
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

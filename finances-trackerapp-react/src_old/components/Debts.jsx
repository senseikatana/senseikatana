import { useState } from 'react';
import Modal from './Modal';

export default function Debts({ data, setData }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ creditor: '', concept: '', total: '', paid: '', monthlyPayment: '', notes: '' });

  const openCreateModal = () => {
    setEditingItem(null);
    setForm({ creditor: '', concept: '', total: '', paid: '0', monthlyPayment: '0', notes: '' });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setForm({
      creditor: item.creditor,
      concept: item.concept,
      total: item.total.toString(),
      paid: item.paid.toString(),
      monthlyPayment: item.monthlyPayment.toString(),
      notes: item.notes || '',
    });
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.creditor.trim() || !form.concept.trim() || Number(form.total) <= 0) {
      alert('Por favor, completa los campos requeridos y define un importe total válido.');
      return;
    }

    const payload = {
      creditor: form.creditor,
      concept: form.concept,
      total: Number(form.total),
      paid: Number(form.paid || 0),
      monthlyPayment: Number(form.monthlyPayment || 0),
      notes: form.notes,
    };

    if (editingItem) {
      setData(d => ({
        ...d,
        debts: d.debts.map(g => g.id === editingItem.id ? { ...g, ...payload } : g)
      }));
    } else {
      const newId = Math.max(...data.debts.map(g => g.id), 0) + 1;
      setData(d => ({
        ...d,
        debts: [...d.debts, { id: newId, ...payload }]
      }));
    }
    setModalOpen(false);
  };

  const remove = (id) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta deuda?')) {
      setData(d => ({ ...d, debts: d.debts.filter(g => g.id !== id) }));
    }
  };

  const totalDebt = data.debts.reduce((s, d) => s + Number(d.total), 0);
  const totalPaid = data.debts.reduce((s, d) => s + Number(d.paid), 0);
  const remaining = totalDebt - totalPaid;

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <span className="card-title">Deudas</span>
          <button className="btn btn-primary" onClick={openCreateModal}>+ Añadir Deuda</button>
        </div>
        {data.debts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">💰</div>
            <div className="empty-state-text">Sin deudas registradas</div>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Acreedor</th>
                  <th>Concepto</th>
                  <th className="text-right">Total</th>
                  <th className="text-right">Pagado</th>
                  <th className="text-right">Restante</th>
                  <th className="text-right">Cuota/mes</th>
                  <th>Notas</th>
                  <th className="text-center" style={{ width: '120px' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data.debts.map(d => {
                  const rest = Number(d.total) - Number(d.paid);
                  return (
                    <tr key={d.id}>
                      <td><strong>{d.creditor}</strong></td>
                      <td>{d.concept}</td>
                      <td className="text-right">{Number(d.total).toFixed(2)}€</td>
                      <td className="text-right text-green">{Number(d.paid).toFixed(2)}€</td>
                      <td className="text-right" style={{ fontWeight: rest > 0 ? '700' : '400', color: rest > 0 ? 'var(--red)' : 'var(--green)' }}>
                        {rest.toFixed(2)}€
                      </td>
                      <td className="text-right">{Number(d.monthlyPayment).toFixed(2)}€</td>
                      <td><span className="text-muted">{d.notes || '—'}</span></td>
                      <td className="text-center">
                        <div style={{ display: 'inline-flex', gap: '6px' }}>
                          <button className="btn btn-ghost btn-sm" onClick={() => openEditModal(d)}>✏️</button>
                          <button className="btn btn-ghost btn-sm text-red" onClick={() => remove(d.id)}>✕</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr style={{ background: 'var(--red-light)', fontWeight: '700' }}>
                  <td colSpan="2">TOTAL DEUDAS</td>
                  <td className="text-right">{totalDebt.toFixed(2)}€</td>
                  <td className="text-right text-green">{totalPaid.toFixed(2)}€</td>
                  <td className="text-right text-red">{remaining.toFixed(2)}€</td>
                  <td className="text-right">{data.debts.reduce((s, d) => s + Number(d.monthlyPayment), 0).toFixed(2)}€</td>
                  <td colSpan="2"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
        {remaining > 0 && (
          <div style={{ marginTop: '16px', padding: '12px 20px', background: 'var(--red-light)', borderRadius: '8px', fontSize: '13px', color: 'var(--red)' }}>
            <strong>Resumen pendiente:</strong> Deuda total {totalDebt.toFixed(2)}€ · Pagado {totalPaid.toFixed(2)}€ ·
            <span style={{ fontWeight: '700' }}> Resta por pagar: {remaining.toFixed(2)}€</span>
            {totalDebt > 0 && ` (${((totalPaid / totalDebt) * 100).toFixed(0)}% liquidado)`}
          </div>
        )}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingItem ? "Editar Deuda" : "Nueva Deuda"}>
        <form onSubmit={handleSave}>
          <div className="form-row" style={{ gap: '10px' }}>
            <div className="form-group" style={{ flex: '1' }}>
              <label>Acreedor</label>
              <input type="text" required placeholder="Ej. Banco, Visa, Amigo..." value={form.creditor} onChange={e => setForm({ ...form, creditor: e.target.value })} />
            </div>
            <div className="form-group" style={{ flex: '1' }}>
              <label>Concepto</label>
              <input type="text" required placeholder="Ej. Préstamo coche, Tarjeta..." value={form.concept} onChange={e => setForm({ ...form, concept: e.target.value })} />
            </div>
          </div>
          <div className="form-row" style={{ gap: '10px' }}>
            <div className="form-group" style={{ flex: '1' }}>
              <label>Importe Total (€)</label>
              <input type="number" step="0.01" min="0.01" required placeholder="0.00" value={form.total} onChange={e => setForm({ ...form, total: e.target.value })} />
            </div>
            <div className="form-group" style={{ flex: '1' }}>
              <label>Importe Pagado (€)</label>
              <input type="number" step="0.01" min="0" required placeholder="0.00" value={form.paid} onChange={e => setForm({ ...form, paid: e.target.value })} />
            </div>
            <div className="form-group" style={{ flex: '1' }}>
              <label>Cuota Mensual (€)</label>
              <input type="number" step="0.01" min="0" placeholder="0.00" value={form.monthlyPayment} onChange={e => setForm({ ...form, monthlyPayment: e.target.value })} />
            </div>
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

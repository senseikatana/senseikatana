import { useState } from 'react';
import Modal from './Modal';

export default function Subscriptions({ data, setData }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ name: '', category: 'Otros', provider: '', amount: '', billingCycle: 'monthly', nextPayment: '', active: true, notes: '' });

  const openCreateModal = () => {
    setEditingItem(null);
    setForm({ name: '', category: 'Otros', provider: '', amount: '', billingCycle: 'monthly', nextPayment: '', active: true, notes: '' });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setForm({ ...item, amount: item.amount.toString() });
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.name.trim() || Number(form.amount) <= 0) {
      alert('Por favor, introduce un nombre y un importe válido.');
      return;
    }

    const payload = {
      ...form,
      amount: Number(form.amount),
    };

    if (editingItem) {
      setData(d => ({
        ...d,
        subscriptions: d.subscriptions.map(s => s.id === editingItem.id ? { ...s, ...payload } : s)
      }));
    } else {
      const newId = Math.max(...data.subscriptions.map(s => s.id), 0) + 1;
      setData(d => ({
        ...d,
        subscriptions: [...d.subscriptions, { id: newId, ...payload }]
      }));
    }
    setModalOpen(false);
  };

  const remove = (id) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta suscripción?')) {
      setData(d => ({
        ...d,
        subscriptions: d.subscriptions.filter(s => s.id !== id)
      }));
    }
  };

  const toggleActive = (id, currentVal) => {
    setData(d => ({
      ...d,
      subscriptions: d.subscriptions.map(s => s.id === id ? { ...s, active: !currentVal } : s)
    }));
  };

  const sorted = [...data.subscriptions].sort((a, b) => (a.active === b.active ? 0 : a.active ? -1 : 1));

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <span className="card-title">Suscripciones</span>
          <button className="btn btn-primary" onClick={openCreateModal}>+ Nueva Suscripción</button>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-light)', marginBottom: '16px' }}>
          Gestiona tus suscripciones recurrentes. El coste mensual equivalente se calcula automáticamente.
        </p>

        <div className="subscription-grid">
          {sorted.map(s => {
            const amountVal = Number(s.amount) || 0;
            const monthly = s.billingCycle === 'annual' ? amountVal / 12 : amountVal;
            return (
              <div key={s.id} className="sub-card" style={{ opacity: s.active ? 1 : 0.5 }}>
                {s.active && <span className="sub-badge badge badge-green">Activa</span>}
                {!s.active && <span className="sub-badge badge badge-red">Inactiva</span>}

                <div className="sub-header">
                  <div>
                    <div className="sub-name">{s.name || 'Suscripción'}</div>
                    <div className="sub-category">{s.category}{s.provider ? ` · ${s.provider}` : ''}</div>
                  </div>
                </div>

                <div className="sub-price">
                  {amountVal.toFixed(2)}€
                  <span style={{ fontSize: '12px', color: 'var(--text-light)', fontWeight: '400' }}>
                    /{s.billingCycle === 'annual' ? 'año' : 'mes'}
                  </span>
                </div>

                <div className="sub-detail">
                  Coste mensual: <strong>{monthly.toFixed(2)}€</strong>
                </div>
                <div className="sub-detail">
                  Próximo pago: {s.nextPayment || '—'}
                </div>
                {s.notes && <div className="sub-detail" style={{ fontStyle: 'italic', marginTop: '4px' }}>"{s.notes}"</div>}

                <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '12px 0' }} />

                <div className="sub-actions" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', margin: 0, cursor: 'pointer', fontSize: '11px' }}>
                    <input 
                      type="checkbox" 
                      checked={s.active} 
                      onChange={() => toggleActive(s.id, s.active)} 
                      style={{ width: 'auto', cursor: 'pointer' }} 
                    />
                    Activa
                  </label>
                  <div style={{ display: 'inline-flex', gap: '6px' }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => openEditModal(s)}>✏️ Editar</button>
                    <button className="btn btn-ghost btn-sm text-red" onClick={() => remove(s.id)}>🗑️</button>
                  </div>
                </div>
              </div>
            );
          })}

          {sorted.length === 0 && (
            <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
              <div className="empty-state-icon">🔄</div>
              <div className="empty-state-text">No hay suscripciones todavía</div>
              <button className="btn btn-primary" onClick={openCreateModal} style={{ marginTop: '10px' }}>+ Añadir primera</button>
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingItem ? "Editar Suscripción" : "Nueva Suscripción"}>
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label>Nombre del servicio</label>
            <input type="text" required placeholder="Ej. Spotify, Netflix, Google One..." value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="form-row" style={{ gap: '10px' }}>
            <div className="form-group" style={{ flex: '1' }}>
              <label>Categoría</label>
              <input type="text" placeholder="Ej. Streaming, Nube..." value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
            </div>
            <div className="form-group" style={{ flex: '1' }}>
              <label>Proveedor</label>
              <input type="text" placeholder="Ej. Google, Proton..." value={form.provider} onChange={e => setForm({ ...form, provider: e.target.value })} />
            </div>
          </div>
          <div className="form-row" style={{ gap: '10px' }}>
            <div className="form-group" style={{ flex: '1' }}>
              <label>Importe (€)</label>
              <input type="number" step="0.01" min="0.01" required placeholder="0.00" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
            </div>
            <div className="form-group" style={{ flex: '1' }}>
              <label>Ciclo de Facturación</label>
              <select value={form.billingCycle} onChange={e => setForm({ ...form, billingCycle: e.target.value })}>
                <option value="monthly">Mensual</option>
                <option value="annual">Anual</option>
              </select>
            </div>
          </div>
          <div className="form-row" style={{ gap: '10px' }}>
            <div className="form-group" style={{ flex: '1' }}>
              <label>Próximo Pago</label>
              <input type="date" value={form.nextPayment} onChange={e => setForm({ ...form, nextPayment: e.target.value })} />
            </div>
            <div className="form-group" style={{ flex: '1', display: 'flex', alignItems: 'center', marginTop: '14px' }}>
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer', margin: 0 }}>
                <input type="checkbox" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} style={{ width: 'auto' }} />
                Suscripción Activa
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>Notas</label>
            <textarea placeholder="Ej. Plan Familiar, 100 GB..." value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} style={{ height: '60px', resize: 'vertical' }} />
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

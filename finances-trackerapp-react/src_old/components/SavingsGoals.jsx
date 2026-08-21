import { useState } from 'react';
import Modal from './Modal';

export default function SavingsGoals({ data, setData }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ name: '', target: '', saved: '' });

  const openCreateModal = () => {
    setEditingItem(null);
    setForm({ name: '', target: '', saved: '0' });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setForm({ name: item.name, target: item.target.toString(), saved: item.saved.toString() });
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.name.trim() || Number(form.target) <= 0) {
      alert('Por favor, introduce un nombre y un importe objetivo válido.');
      return;
    }

    const payload = {
      name: form.name,
      target: Number(form.target),
      saved: Number(form.saved || 0),
    };

    if (editingItem) {
      setData(d => ({
        ...d,
        savingsGoals: d.savingsGoals.map(g => g.id === editingItem.id ? { ...g, ...payload } : g)
      }));
    } else {
      const newId = Math.max(...data.savingsGoals.map(g => g.id), 0) + 1;
      setData(d => ({
        ...d,
        savingsGoals: [...d.savingsGoals, { id: newId, ...payload }]
      }));
    }
    setModalOpen(false);
  };

  const remove = (id) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta meta de ahorro?')) {
      setData(d => ({ ...d, savingsGoals: d.savingsGoals.filter(g => g.id !== id) }));
    }
  };

  const totalTarget = data.savingsGoals.reduce((s, g) => s + Number(g.target), 0);
  const totalSaved = data.savingsGoals.reduce((s, g) => s + Number(g.saved), 0);

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <span className="card-title">Metas de Ahorro</span>
          <button className="btn btn-primary" onClick={openCreateModal}>+ Nueva Meta</button>
        </div>
        {data.savingsGoals.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🎯</div>
            <div className="empty-state-text">Sin metas definidas</div>
          </div>
        ) : (
          <div className="stats-grid" style={{gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))'}}>
            {data.savingsGoals.map(g => {
              const targetVal = Number(g.target) || 0;
              const savedVal = Number(g.saved) || 0;
              const pct = targetVal > 0 ? (savedVal / targetVal) * 100 : 0;
              return (
                <div key={g.id} className="goal-card">
                  <div className="goal-header" style={{ alignItems: 'center' }}>
                    <span className="goal-name" style={{ fontSize: '14px', fontWeight: '700' }}>{g.name}</span>
                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => openEditModal(g)} style={{ padding: '2px 6px' }}>✏️</button>
                      <button className="btn btn-ghost btn-sm text-red" onClick={() => remove(g.id)} style={{ padding: '2px 6px' }}>✕</button>
                    </div>
                  </div>
                  <div style={{ margin: '8px 0', fontSize: '13px' }}>
                    Objetivo: <strong>{targetVal.toFixed(2)}€</strong> · Ahorrado: <strong className="text-green">{savedVal.toFixed(2)}€</strong>
                  </div>
                  <div className="progress-bar" style={{ height: '10px' }}>
                    <div className={`progress-fill ${pct >= 75 ? 'progress-green' : pct >= 40 ? 'progress-orange' : 'progress-red'}`}
                         style={{width:`${Math.min(100, pct)}%`}} />
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:'11px',color:'var(--text-light)',marginTop:'6px'}}>
                    <span>Progreso: {pct.toFixed(0)}%</span>
                    <span>Restan: {Math.max(0, targetVal - savedVal).toFixed(2)}€</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="card" style={{background:'var(--green-light)',marginTop:'16px', marginBottom:0, padding:'14px 20px'}}>
          <div style={{display:'flex',justifyContent:'space-between',fontWeight:'700',fontSize:'15px', color:'var(--green)'}}>
            <span>Total Ahorrado</span>
            <span>{totalSaved.toFixed(2)}€ / {totalTarget.toFixed(2)}€ ({totalTarget > 0 ? ((totalSaved/totalTarget)*100).toFixed(0) : 0}%)</span>
          </div>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingItem ? "Editar Meta de Ahorro" : "Nueva Meta de Ahorro"}>
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label>Nombre de la meta</label>
            <input type="text" required placeholder="Ej. Fondo de emergencia, Coche nuevo, Viaje..." value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="form-row" style={{ gap: '10px' }}>
            <div className="form-group" style={{ flex: '1' }}>
              <label>Cantidad Objetivo (€)</label>
              <input type="number" step="0.01" min="0.01" required placeholder="0.00" value={form.target} onChange={e => setForm({ ...form, target: e.target.value })} />
            </div>
            <div className="form-group" style={{ flex: '1' }}>
              <label>Cantidad Ahorrada (€)</label>
              <input type="number" step="0.01" min="0" required placeholder="0.00" value={form.saved} onChange={e => setForm({ ...form, saved: e.target.value })} />
            </div>
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

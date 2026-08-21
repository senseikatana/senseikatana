import { useState } from 'react';
import Modal from './Modal';

export default function DailyRegister({ data, setData }) {
  const [filter, setFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ date: '', category: 'Otros', concept: '', amount: '', type: 'Variable', necessary: true, notes: '' });

  const entries = data.dailyRegister || [];
  const categories = data.expenseCategories || [];

  const openCreateModal = () => {
    setEditingItem(null);
    setForm({ date: new Date().toISOString().split('T')[0], category: categories[0] || 'Otros', concept: '', amount: '', type: 'Variable', necessary: true, notes: '' });
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
        dailyRegister: d.dailyRegister.map(e => e.id === editingItem.id ? { ...e, ...payload } : e)
      }));
    } else {
      const newId = Math.max(...entries.map(e => e.id), 0) + 1;
      setData(d => ({
        ...d,
        dailyRegister: [{ id: newId, ...payload }, ...d.dailyRegister]
      }));
    }
    setModalOpen(false);
  };

  const remove = (id) => {
    if (confirm('¿Eliminar este gasto?')) {
      setData(d => ({ ...d, dailyRegister: d.dailyRegister.filter(e => e.id !== id) }));
    }
  };

  const toggleNecessary = (id, currentVal) => {
    setData(d => ({
      ...d,
      dailyRegister: d.dailyRegister.map(e => e.id === id ? { ...e, necessary: !currentVal } : e)
    }));
  };

  const filtered = filter === 'all' ? entries : entries.filter(e => e.type === filter);
  const totalFijo = entries.filter(e => e.type === 'Fijo').reduce((s, e) => s + Number(e.amount), 0);
  const totalVar = entries.filter(e => e.type === 'Variable').reduce((s, e) => s + Number(e.amount), 0);
  const totalExtra = entries.filter(e => e.type === 'Extraordinario').reduce((s, e) => s + Number(e.amount), 0);

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <span className="card-title">Registro Diario</span>
          <button className="btn btn-primary" onClick={openCreateModal}>+ Nuevo Gasto</button>
        </div>
        <p style={{fontSize:'12px',color:'var(--text-light)',marginBottom:'12px'}}>
          Anota cada gasto nada más producirlo. Clasifícalo como Fijo, Variable o Extraordinario.
        </p>

        <div style={{display:'flex',gap:'8px',marginBottom:'12px',flexWrap:'wrap'}}>
          {[
            { key: 'all', label: `Todos (${entries.length})` },
            { key: 'Fijo', label: `Fijos (${entries.filter(e => e.type === 'Fijo').length})` },
            { key: 'Variable', label: `Variables (${entries.filter(e => e.type === 'Variable').length})` },
            { key: 'Extraordinario', label: `Extraordinarios (${entries.filter(e => e.type === 'Extraordinario').length})` },
          ].map(f => (
            <button key={f.key}
              className={`btn btn-sm ${filter === f.key ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setFilter(f.key)}>
              {f.label}
            </button>
          ))}
        </div>

        <div className="table-wrapper">
          <table>
            <thead><tr>
              <th>Fecha</th><th>Categoría</th><th>Concepto</th><th className="text-right">Importe</th><th>Tipo</th><th style={{textAlign:'center'}}>Necesario</th><th>Notas</th><th className="text-center" style={{ width: '120px' }}>Acciones</th>
            </tr></thead>
            <tbody>
              {filtered.map(e => (
                <tr key={e.id}>
                  <td>{e.date}</td>
                  <td><span className="badge badge-orange">{e.category}</span></td>
                  <td><strong>{e.concept}</strong></td>
                  <td className="text-right text-red" style={{ fontWeight: '600' }}>{Number(e.amount).toFixed(2)}€</td>
                  <td>
                    <span className={`badge ${e.type === 'Fijo' ? 'badge-blue' : e.type === 'Variable' ? 'badge-orange' : e.type === 'Extraordinario' ? 'badge-red' : 'badge-green'}`}>
                      {e.type}
                    </span>
                  </td>
                  <td style={{textAlign:'center'}}>
                    <input type="checkbox" checked={e.necessary} onChange={() => toggleNecessary(e.id, e.necessary)}
                           style={{width:'auto',transform:'scale(1.2)', cursor: 'pointer'}} />
                  </td>
                  <td><span className="text-muted">{e.notes || '—'}</span></td>
                  <td className="text-center">
                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => openEditModal(e)}>✏️</button>
                      <button className="btn btn-ghost btn-sm text-red" onClick={() => remove(e.id)}>✕</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="8" style={{textAlign:'center',padding:'20px',color:'var(--text-light)'}}>
                  No hay gastos registrados. ¡Añade el primero!
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="card-header"><span className="card-title">Resumen del Registro</span></div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:'10px'}}>
          <div style={{padding:'12px',background:'var(--blue-light)',borderRadius:'8px'}}>
            <div style={{fontSize:'11px',textTransform:'uppercase',color:'var(--text-light)'}}>Fijos</div>
            <div style={{fontSize:'18px',fontWeight:'700',color:'var(--blue)'}}>{totalFijo.toFixed(2)}€</div>
          </div>
          <div style={{padding:'12px',background:'var(--orange-light)',borderRadius:'8px'}}>
            <div style={{fontSize:'11px',textTransform:'uppercase',color:'var(--text-light)'}}>Variables</div>
            <div style={{fontSize:'18px',fontWeight:'700',color:'var(--orange)'}}>{totalVar.toFixed(2)}€</div>
          </div>
          <div style={{padding:'12px',background:'var(--red-light)',borderRadius:'8px'}}>
            <div style={{fontSize:'11px',textTransform:'uppercase',color:'var(--text-light)'}}>Extraordinarios</div>
            <div style={{fontSize:'18px',fontWeight:'700',color:'var(--red)'}}>{totalExtra.toFixed(2)}€</div>
          </div>
          <div style={{padding:'12px',background:'var(--green-light)',borderRadius:'8px'}}>
            <div style={{fontSize:'11px',textTransform:'uppercase',color:'var(--text-light)'}}>Total</div>
            <div style={{fontSize:'18px',fontWeight:'700',color:'var(--green)'}}>{(totalFijo+totalVar+totalExtra).toFixed(2)}€</div>
          </div>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingItem ? "Editar Registro" : "Nuevo Registro"}>
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
            <input type="text" required placeholder="Ej. Compra súper, Cena, Gasolina..." value={form.concept} onChange={e => setForm({ ...form, concept: e.target.value })} />
          </div>
          <div className="form-row" style={{ gap: '10px' }}>
            <div className="form-group" style={{ flex: '1' }}>
              <label>Importe (€)</label>
              <input type="number" step="0.01" min="0.01" required placeholder="0.00" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
            </div>
            <div className="form-group" style={{ flex: '1' }}>
              <label>Tipo de Gasto</label>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                <option value="Variable">Variable</option>
                <option value="Fijo">Fijo</option>
                <option value="Extraordinario">Extraordinario</option>
              </select>
            </div>
          </div>
          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
            <input type="checkbox" id="necessaryDailyCheck" checked={form.necessary} onChange={e => setForm({ ...form, necessary: e.target.checked })} style={{ width: 'auto' }} />
            <label htmlFor="necessaryDailyCheck" style={{ margin: 0, cursor: 'pointer' }}>Gasto de primera necesidad</label>
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

import { useState } from 'react';

export default function Categories({ data, setData }) {
  const [activeTab, setActiveTab] = useState('expense'); // 'income', 'fixed', 'expense'
  const [newCatName, setNewCatName] = useState('');
  const [editingCat, setEditingCat] = useState(null); // { type, name, newName }
  const [error, setError] = useState('');

  const incomeCats = data.incomeCategories || [];
  const fixedCats = data.fixedCategories || [];
  const expenseCats = data.expenseCategories || [];

  const categories = {
    income: incomeCats,
    fixed: fixedCats,
    expense: expenseCats,
  };

  const labels = {
    income: 'Ingresos',
    fixed: 'Gastos Fijos',
    expense: 'Gastos Variables',
  };

  const getTransactionsCount = (type, category) => {
    if (type === 'income') {
      return (data.income || []).filter(i => i.category === category).length;
    } else if (type === 'fixed') {
      return (data.fixedExpenses || []).filter(e => e.category === category).length;
    } else if (type === 'expense') {
      const fromVar = (data.variableExpenses || []).filter(e => e.category === category).length;
      const fromDaily = (data.dailyRegister || []).filter(e => e.category === category).length;
      const fromBudget = (data.budget || []).filter(b => b.category === category && Number(b.planned) > 0).length;
      return fromVar + fromDaily + fromBudget;
    }
    return 0;
  };

  const addCategory = (type) => {
    const trimmed = newCatName.trim();
    if (!trimmed) return;

    const currentList = categories[type];
    if (currentList.some(c => c.toLowerCase() === trimmed.toLowerCase())) {
      setError('La categoría ya existe');
      return;
    }

    setError('');
    setNewCatName('');

    setData(d => {
      const updated = { ...d };
      if (type === 'income') {
        updated.incomeCategories = [...(d.incomeCategories || []), trimmed];
      } else if (type === 'fixed') {
        updated.fixedCategories = [...(d.fixedCategories || []), trimmed];
      } else if (type === 'expense') {
        updated.expenseCategories = [...(d.expenseCategories || []), trimmed];
        if (!d.budget.some(b => b.category === trimmed)) {
          updated.budget = [...d.budget, { category: trimmed, planned: 0 }];
        }
      }
      return updated;
    });
  };

  const startEditing = (type, name) => {
    setEditingCat({ type, name, newName: name });
    setError('');
  };

  const saveRename = () => {
    if (!editingCat) return;
    const { type, name, newName } = editingCat;
    const trimmed = newName.trim();

    if (!trimmed || trimmed === name) {
      setEditingCat(null);
      return;
    }

    const currentList = categories[type];
    if (currentList.some(c => c.toLowerCase() === trimmed.toLowerCase() && c !== name)) {
      setError('Ya existe otra categoría con ese nombre');
      return;
    }

    setError('');
    setEditingCat(null);

    setData(d => {
      let updated = { ...d };
      if (type === 'income') {
        updated.incomeCategories = (d.incomeCategories || []).map(c => c === name ? trimmed : c);
        updated.income = (d.income || []).map(item => item.category === name ? { ...item, category: trimmed } : item);
      } else if (type === 'fixed') {
        updated.fixedCategories = (d.fixedCategories || []).map(c => c === name ? trimmed : c);
        updated.fixedExpenses = (d.fixedExpenses || []).map(item => item.category === name ? { ...item, category: trimmed } : item);
      } else if (type === 'expense') {
        updated.expenseCategories = (d.expenseCategories || []).map(c => c === name ? trimmed : c);
        updated.variableExpenses = (d.variableExpenses || []).map(item => item.category === name ? { ...item, category: trimmed } : item);
        updated.dailyRegister = (d.dailyRegister || []).map(item => item.category === name ? { ...item, category: trimmed } : item);
        updated.budget = (d.budget || []).map(item => item.category === name ? { ...item, category: trimmed } : item);
      }
      return updated;
    });
  };

  const deleteCategory = (type, name) => {
    const count = getTransactionsCount(type, name);
    const message = count > 0 
      ? `La categoría "${name}" tiene ${count} registros asociados. Si la eliminas, estos registros se cambiarán a "Otros". ¿Estás seguro?`
      : `¿Estás seguro de que quieres eliminar la categoría "${name}"?`;

    if (!confirm(message)) return;

    setData(d => {
      let updated = { ...d };
      if (type === 'income') {
        updated.incomeCategories = (d.incomeCategories || []).filter(c => c !== name);
        updated.income = (d.income || []).map(item => item.category === name ? { ...item, category: 'Otros' } : item);
        if (!updated.incomeCategories.includes('Otros')) {
          updated.incomeCategories.push('Otros');
        }
      } else if (type === 'fixed') {
        updated.fixedCategories = (d.fixedCategories || []).filter(c => c !== name);
        updated.fixedExpenses = (d.fixedExpenses || []).map(item => item.category === name ? { ...item, category: 'Otros' } : item);
        if (!updated.fixedCategories.includes('Otros')) {
          updated.fixedCategories.push('Otros');
        }
      } else if (type === 'expense') {
        updated.expenseCategories = (d.expenseCategories || []).filter(c => c !== name);
        updated.variableExpenses = (d.variableExpenses || []).map(item => item.category === name ? { ...item, category: 'Otros' } : item);
        updated.dailyRegister = (d.dailyRegister || []).map(item => item.category === name ? { ...item, category: 'Otros' } : item);
        updated.budget = (d.budget || []).filter(item => item.category !== name);
        if (!updated.expenseCategories.includes('Otros')) {
          updated.expenseCategories.push('Otros');
          if (!updated.budget.some(b => b.category === 'Otros')) {
            updated.budget.push({ category: 'Otros', planned: 0 });
          }
        }
      }
      return updated;
    });
  };

  const currentCats = categories[activeTab];

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <span className="card-title">Gestión de Categorías</span>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-light)', marginBottom: '16px' }}>
          Personaliza las categorías de tu aplicación. Al renombrar o eliminar una categoría,
          los cambios se aplicarán automáticamente a todos tus registros históricos.
        </p>

        {/* Tab selection */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
          {Object.keys(labels).map(tab => (
            <button
              key={tab}
              className={`btn btn-sm ${activeTab === tab ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => {
                setActiveTab(tab);
                setError('');
                setEditingCat(null);
                setNewCatName('');
              }}
            >
              {labels[tab]}
            </button>
          ))}
        </div>

        {/* Form to add category */}
        <div className="form-row" style={{ alignItems: 'flex-end', marginBottom: '20px', gap: '10px' }}>
          <div className="form-group" style={{ flex: '1', marginBottom: 0 }}>
            <label>Nueva Categoría para {labels[activeTab]}</label>
            <input
              type="text"
              value={newCatName}
              onChange={e => setNewCatName(e.target.value)}
              placeholder="Ej: Suscripciones de Streaming, Transporte Público..."
              onKeyDown={e => e.key === 'Enter' && addCategory(activeTab)}
            />
          </div>
          <button className="btn btn-primary" onClick={() => addCategory(activeTab)} style={{ height: '36px' }}>
            Añadir
          </button>
        </div>

        {error && (
          <div style={{ color: 'var(--red)', fontSize: '12px', marginBottom: '12px', fontWeight: '600' }}>
            ⚠️ {error}
          </div>
        )}

        {/* Category list */}
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Categoría</th>
                <th className="text-center" style={{ width: '120px' }}>Nº Registros</th>
                <th className="text-right" style={{ width: '180px' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentCats.map(cat => {
                const count = getTransactionsCount(activeTab, cat);
                const isEditing = editingCat && editingCat.type === activeTab && editingCat.name === cat;

                return (
                  <tr key={cat}>
                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editingCat.newName}
                          onChange={e => setEditingCat({ ...editingCat, newName: e.target.value })}
                          style={{ fontWeight: '600', padding: '4px 8px' }}
                          autoFocus
                          onKeyDown={e => e.key === 'Enter' && saveRename()}
                        />
                      ) : (
                        <strong>{cat}</strong>
                      )}
                    </td>
                    <td className="text-center">
                      <span className="badge badge-blue">{count}</span>
                    </td>
                    <td className="text-right">
                      {isEditing ? (
                        <div style={{ display: 'inline-flex', gap: '6px' }}>
                          <button className="btn btn-green btn-sm" onClick={saveRename}>Guardar</button>
                          <button className="btn btn-ghost btn-sm" onClick={() => setEditingCat(null)}>Cancelar</button>
                        </div>
                      ) : (
                        <div style={{ display: 'inline-flex', gap: '6px' }}>
                          <button
                            className="btn btn-ghost btn-sm"
                            onClick={() => startEditing(activeTab, cat)}
                            disabled={cat === 'Otros'}
                          >
                            ✏️ Editar
                          </button>
                          <button
                            className="btn btn-ghost btn-sm text-red"
                            onClick={() => deleteCategory(activeTab, cat)}
                            disabled={cat === 'Otros'}
                          >
                            🗑️ Borrar
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
              {currentCats.length === 0 && (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-light)' }}>
                    No hay categorías en este grupo. ¡Añade una!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

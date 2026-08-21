'use client';
import { useState } from 'react';
import { useData } from '@/context/DataProvider';
import Modal from '@/components/Modal';

export default function VariableExpensesPage() {
  const { data, setData } = useData();
  const [m, setM] = useState(false);
  const [e, setE] = useState(null);
  const [f, setF] = useState({ date:'', category:'Alimentación', concept:'', amount:'', necessary:true, notes:'' });

  var cats = data.expenseCategories||[];
  var items = data.variableExpenses||[];
  var cur = data.settings?.currency||'€';

  var openC = function(){setE(null);setF({date:new Date().toISOString().split('T')[0],category:'Alimentación',concept:'',amount:'',necessary:true,notes:''});setM(true)};
  
  var save = function(ev){
    ev.preventDefault();
    if(!f.concept.trim()||Number(f.amount)<=0) {alert('Introduce concepto y importe válido.'); return;}
    var p = {...f,amount:Number(f.amount)};
    if(e){
      setData(function(d){return{...d,variableExpenses:items.map(function(i){return i.id===e.id?{...i,...p}:i;})}});
    } else {
      var id = Math.max(0,...items.map(function(i){return i.id;})) + 1;
      setData(function(d){return{...d,variableExpenses:items.concat([{id:id,...p}])};});
    }
    setM(false);
  };

  var remove = function(id){if(confirm('¿Eliminar?')) setData(function(d){return{...d,variableExpenses:items.filter(function(i){return i.id!==id;})}});};
  var total = items.reduce(function(s,i){return s+Number(i.amount);},0);

  return (
    <div>
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-primary">🛒 Gastos Variables</h2>
          <button onClick={openC} className="px-4 py-2 rounded-lg font-medium text-white" style={{background:'var(--color-orange)'}}>+ Nuevo</button>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead><tr><th>Fecha</th><th>Categoría</th><th>Concepto</th><th className="text-right">Importe</th><th>Necesario</th><th className="text-center">Acciones</th></tr></thead>
            <tbody>
              {items.map(function(i){
                return (
                  <tr key={i.id}>
                    <td>{i.date}</td>
                    <td><span className="badge" style={{background:'var(--color-orange-light)',color:'var(--color-orange)'}}>{i.category}</span></td>
                    <td><strong>{i.concept}</strong></td>
                    <td className="text-right font-semibold" style={{color:'var(--color-orange)'}}>{Number(i.amount).toFixed(2)}{cur}</td>
                    <td>{i.necessary?'✅':'❌'}</td>
                    <td className="text-center">
                      <div className="inline-flex gap-2">
                        <button onClick={function(){setE(i);setF({...i,amount:i.amount.toString()});setM(true)}} className="btn btn-sm">✏️</button>
                        <button onClick={function(){remove(i.id)}} className="btn btn-sm text-red">✕</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {items.length===0 && <tr><td colSpan="6" className="text-center py-8 text-muted-foreground">Sin gastos variables</td></tr>}
            </tbody>
            <tfoot><tr className="font-bold" style={{background:'var(--color-orange-light)'}}><td colSpan="3">TOTAL</td><td className="text-right" style={{color:'var(--color-orange)'}}>{total.toFixed(2)}{cur}</td><td colSpan="2"></td></tr></tfoot>
          </table>
        </div>
      </div>

      <Modal isOpen={m} onClose={function(){setM(false)}} title={e?'Editar Gasto':'Nuevo Gasto'}>
        <form onSubmit={save}>
          <div className="mb-3"><label className="block text-sm font-medium mb-1">Fecha</label><input type="date" required value={f.date} onChange={function(ev){setF({...f,date:ev.target.value})}} className="input" /></div>
          <div className="mb-3"><label className="block text-sm font-medium mb-1">Categoría</label><select value={f.category} onChange={function(ev){setF({...f,category:ev.target.value})}} className="input">{cats.map(function(c){return <option key={c} value={c}>{c}</option>})}</select></div>
          <div className="mb-3"><label className="block text-sm font-medium mb-1">Concepto</label><input type="text" required placeholder="Ej. Compra super" value={f.concept} onChange={function(ev){setF({...f,concept:ev.target.value})}} className="input" /></div>
          <div className="mb-3"><label className="block text-sm font-medium mb-1">Importe ({cur})</label><input type="number" step="0.01" min="0.01" required placeholder="0.00" value={f.amount} onChange={function(ev){setF({...f,amount:ev.target.value})}} className="input" /></div>
          <div className="mb-4"><label><input type="checkbox" checked={f.necessary} onChange={function(ev){setF({...f,necessary:ev.target.checked})}} /> Necesario</label></div>
          <div className="flex justify-end gap-2"><button type="button" onClick={function(){setM(false)}} className="px-4 py-2">Cancelar</button><button type="submit" className="px-4 py-2 rounded-lg font-medium text-white" style={{background:'var(--color-orange)'}}>Guardar</button></div>
        </form>
      </Modal>
    </div>
  );
}


'use client';
import { useState } from 'react';
import { useData } from '@/context/DataProvider';
import Modal from '@/components/Modal';

export default function DailyRegisterPage() {
  const { data, setData } = useData();
  const [m, setM] = useState(false);
  const [f, setF] = useState({date:'',category:'Alimentación',concept:'',amount:'',type:'Variable',necessary:true,notes:''});
  var items = data.dailyRegister||[];
  var cur = data.settings?.currency||'€';
  var cats = data.expenseCategories||[];

  var save = function(ev){
    ev.preventDefault();
    if(!f.concept.trim()||Number(f.amount)<=0) return;
    var p = {...f, amount:Number(f.amount)};
    var id = Math.max(0,...items.map(function(i){return i.id;})) + 1;
    setData(function(d){return{...d,dailyRegister:items.concat([{id:id,...p}])};});
    setM(false);
    setF({date:new Date().toISOString().split('T')[0],category:'Alimentación',concept:'',amount:'',type:'Variable',necessary:true,notes:''});
  };

  var total = items.reduce(function(s,i){return s+Number(i.amount);},0);

  return (
    <div>
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-primary">📝 Registro Diario</h2>
          <button onClick={function(){setM(true)}} className="px-4 py-2 rounded-lg font-medium text-white" style={{background:'var(--color-primary)'}}>+ Nuevo</button>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead><tr><th>Fecha</th><th>Categoría</th><th>Concepto</th><th>Tipo</th><th className="text-right">Importe</th><th>Notas</th></tr></thead>
            <tbody>
              {items.map(function(i){
                return (
                  <tr key={i.id}>
                    <td>{i.date}</td>
                    <td><span className="badge">{i.category}</span></td>
                    <td><strong>{i.concept}</strong></td>
                    <td><span className="badge" style={{background:i.type==='Variable'?'var(--color-orange-light)':'var(--color-blue-light)', color:i.type==='Variable'?'var(--color-orange)':'var(--color-blue)'}}>{i.type}</span></td>
                    <td className="text-right font-semibold text-red">{Number(i.amount).toFixed(2)}{cur}</td>
                    <td className="text-muted-foreground text-sm">{i.notes||'—'}</td>
                  </tr>
                );
              })}
              {items.length===0 && <tr><td colSpan="6" className="text-center py-8 text-muted-foreground">Sin registros</td></tr>}
            </tbody>
            <tfoot><tr className="font-bold" style={{background:'var(--color-red-light)'}}><td colSpan="3">TOTAL</td><td></td><td className="text-right text-red">{total.toFixed(2)}{cur}</td><td></td></tr></tfoot>
          </table>
        </div>
      </div>

      <Modal isOpen={m} onClose={function(){setM(false)}} title="Nuevo Registro">
        <form onSubmit={save}>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div><label>Fecha</label><input type="date" required value={f.date} onChange={function(ev){setF({...f,date:ev.target.value})}} className="input" /></div>
            <div><label>Tipo</label><select value={f.type} onChange={function(ev){setF({...f,type:ev.target.value})}} className="input"><option>Fijo</option><option>Variable</option><option>Extraordinario</option></select></div>
          </div>
          <div className="mb-3"><label>Categoría</label><select value={f.category} onChange={function(ev){setF({...f,category:ev.target.value})}} className="input">{cats.map(function(c){return <option key={c}>{c}</option>})}</select></div>
          <div className="mb-3"><label>Concepto</label><input type="text" required value={f.concept} onChange={function(ev){setF({...f,concept:ev.target.value})}} className="input" /></div>
          <div className="mb-3"><label>Importe ({cur})</label><input type="number" step="0.01" min="0.01" required value={f.amount} onChange={function(ev){setF({...f,amount:ev.target.value})}} className="input" /></div>
          <div className="mb-3"><label><input type="checkbox" checked={f.necessary} onChange={function(ev){setF({...f,necessary:ev.target.checked})}} /> Necesario</label></div>
          <div className="flex justify-end gap-2"><button type="button" onClick={function(){setM(false)}} className="px-4 py-2">Cancelar</button><button type="submit" className="px-4 py-2 rounded-lg font-medium text-white" style={{background:'var(--color-primary)'}}>Guardar</button></div>
        </form>
      </Modal>
    </div>
  );
}

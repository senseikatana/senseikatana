'use client';
import { useState } from 'react';
import { useData } from '@/context/DataProvider';

export default function PresupuestosPage() {
  const { data, setData } = useData();
  const [tab, setTab] = useState('personal');
  var budget = tab==='personal' ? (data.budget||[]) : (data.businessBudget||[]);
  var items = tab==='personal' ? (data.variableExpenses||[]).concat(data.dailyRegister||[]) : (data.businessExpenses||[]);
  var cur = data.settings?.currency||'€';

  var updatePlanned = function(cat, val){
    var setter = function(d){
      var u = {...d};
      if(tab==='personal') u.budget = d.budget.map(function(b){return b.category===cat?{...b,planned:Number(val)}:b});
      else u.businessBudget = d.businessBudget.map(function(b){return b.category===cat?{...b,planned:Number(val)}:b});
      return u;
    };
    setData(setter);
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button onClick={function(){setTab('personal')}} className={'px-4 py-2 rounded-lg font-medium '+(tab==='personal'?'bg-primary text-white':'bg-gray-100')}>👤 Personal</button>
        <button onClick={function(){setTab('negocio')}} className={'px-4 py-2 rounded-lg font-medium '+(tab==='negocio'?'bg-primary text-white':'bg-gray-100')}>💼 Negocio</button>
      </div>
      <div className="card">
        <h2 className="text-xl font-bold text-primary mb-4">🎯 Presupuesto {tab==='personal'?'Personal':'Negocio'}</h2>
        <div className="overflow-x-auto">
          <table className="table">
            <thead><tr><th>Categoría</th><th className="text-right">Planificado</th><th className="text-right">Real</th><th className="text-right">Diferencia</th><th>Estado</th></tr></thead>
            <tbody>
              {budget.map(function(b){
                var real = 0;
                if(tab==='personal'){
                  real = (data.fixedExpenses||[]).filter(function(e){return e.category===b.category}).reduce(function(s,e){return s+Number(e.amount);},0)
                    + (data.variableExpenses||[]).filter(function(e){return e.category===b.category}).reduce(function(s,e){return s+Number(e.amount);},0)
                    + (data.dailyRegister||[]).filter(function(e){return e.category===b.category}).reduce(function(s,e){return s+Number(e.amount);},0);
                } else {
                  real = (data.businessExpenses||[]).filter(function(e){return e.category===b.category}).reduce(function(s,e){return s+Number(e.amount);},0);
                }
                var diff = real - b.planned;
                var status = diff > 0 ? '❌' : diff === 0 ? '✅' : '✅';
                return (
                  <tr key={b.category}>
                    <td className="font-medium">{b.category}</td>
                    <td className="text-right"><input type="number" value={b.planned} onChange={function(e){updatePlanned(b.category,e.target.value)}} className="input w-24 text-right" /></td>
                    <td className="text-right font-bold">{real.toFixed(2)}{cur}</td>
                    <td className="text-right" style={{color:diff>0?'var(--color-red)':'var(--color-green)'}}>{diff>=0?'+':''}{diff.toFixed(2)}{cur}</td>
                    <td className="text-center">{status}</td>
                  </tr>
                );
              })}
              {budget.length===0 && <tr><td colSpan="5" className="text-center py-8 text-muted-foreground">Sin presupuesto definido</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

'use client';
import { useState } from 'react';
import { useData } from '@/context/DataProvider';

export default function CategoriasPage() {
  const { data, setData } = useData();
  const [tab, setTab] = useState('income');
  const [newCat, setNewCat] = useState('');

  var cats = {income:{list:data.incomeCategories||[],label:'Ingresos'},fixed:{list:data.fixedCategories||[],label:'Gastos Fijos'},expense:{list:data.expenseCategories||[],label:'Gastos Variables'},bizInc:{list:data.businessIncomeCategories||[],label:'Ingresos Negocio'},bizExp:{list:data.businessExpenseCategories||[],label:'Gastos Negocio'}};
  var current = cats[tab];

  var addCat = function(){
    var t = newCat.trim();
    if (!t) return;
    if (current.list.some(function(c){return c.toLowerCase()===t.toLowerCase()})) {alert('Ya existe');return;}
    setNewCat('');
    setData(function(d){
      var u = {...d};
      if(tab==='income') u.incomeCategories = d.incomeCategories.concat([t]);
      else if(tab==='fixed') u.fixedCategories = d.fixedCategories.concat([t]);
      else if(tab==='expense') u.expenseCategories = d.expenseCategories.concat([t]);
      else if(tab==='bizInc') u.businessIncomeCategories = d.businessIncomeCategories.concat([t]);
      else u.businessExpenseCategories = d.businessExpenseCategories.concat([t]);
      return u;
    });
  };

  return (
    <div>
      <div className="card">
        <h2 className="text-xl font-bold text-primary mb-4">🏷️ Gestión de Categorías</h2>
        <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-border">
          {Object.keys(cats).map(function(k){
            return <button key={k} onClick={function(){setTab(k)}} className={'px-3 py-1 rounded-lg text-sm font-medium '+(tab===k?'bg-primary text-white':'bg-gray-100 text-gray-600 hover:bg-gray-200')}>{cats[k].label}</button>;
          })}
        </div>
        <div className="flex gap-2 mb-4">
          <input type="text" placeholder={'Nueva categoría '+current.label} value={newCat} onChange={function(e){setNewCat(e.target.value)}} onKeyDown={function(e){if(e.key==='Enter')addCat()}} className="input flex-1" />
          <button onClick={addCat} className="px-4 py-2 rounded-lg bg-primary text-white font-medium">Añadir</button>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead><tr><th>Categoría</th><th className="text-right">Acciones</th></tr></thead>
            <tbody>
              {current.list.map(function(c){
                return (
                  <tr key={c}>
                    <td className="font-medium">{c}</td>
                    <td className="text-right">
                      <div className="inline-flex gap-2">
                        <button onClick={function(){
                          var n = prompt('Nuevo nombre para "'+c+'":', c);
                          if(n && n!==c) {
                            setData(function(d){
                              var u = {...d};
                              if(tab==='income') u.incomeCategories = d.incomeCategories.map(function(x){return x===c?n:x});
                              return u;
                            });
                          }
                        }} className="btn btn-sm">✏️</button>
                        <button onClick={function(){
                          if(!confirm('¿Eliminar "'+c+'"?')) return;
                          setData(function(d){
                            var u = {...d};
                            if(tab==='income') u.incomeCategories = d.incomeCategories.filter(function(x){return x!==c});
                            return u;
                          });
                        }} className="btn btn-sm text-red">✕</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {current.list.length===0 && <tr><td colSpan="2" className="text-center py-8 text-muted-foreground">Sin categorías</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


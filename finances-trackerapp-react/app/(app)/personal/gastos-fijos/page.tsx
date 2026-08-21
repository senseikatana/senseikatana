// @ts-nocheck
'use client';
import { useState } from 'react';
import { useData } from '@/context/DataProvider';
import Modal from '@/components/Modal';
import { CrudTable } from '@/components/CrudTable';

export default function FixedExpensesPage() {
  const { data, setData } = useData();
  const [m, setM] = useState(false);
  const [e, setE] = useState<any>(null);
  const [f, setF] = useState<any>({category:'Vivienda',concept:'',provider:'',amount:'',dueDate:1,paid:false});
  const categories = data.fixedCategories || [];
  const items = data.fixedExpenses || [];
  const cur = data.settings?.currency||'€';

  const openC = () => {setE(null);setF({category:'Vivienda',concept:'',provider:'',amount:'',dueDate:1,paid:false});setM(true)};
  const openE = (i:any) => {setE(i);setF({...i,amount:i.amount.toString()});setM(true)};
  const save = (ev:React.FormEvent) => {ev.preventDefault();const p={...f,amount:Number(f.amount),dueDate:Number(f.dueDate)};if(e){setData((d:any)=>({...d,fixedExpenses:items.map((i:any)=>i.id===e.id?{...i,...p}:i)}))}else{const id=Math.max(0,...items.map((i:any)=>i.id))+1;setData((d:any)=>({...d,fixedExpenses:[...items,{id,...p}]}))}setM(false)};
  const del = (i:any) => {if(confirm('Eliminar?'))setData((d:any)=>({...d,fixedExpenses:items.filter((x:any)=>x.id!==i.id)}))};
  const delB = (batch:any[]) => {const ids=new Set(batch.map((i:any)=>i.id));setData((d:any)=>({...d,fixedExpenses:items.filter((i:any)=>!ids.has(i.id))}))};
  const total=items.reduce((s:number,i:any)=>s+Number(i.amount),0);
  const paid=items.filter((i:any)=>i.paid).reduce((s:number,i:any)=>s+Number(i.amount),0);

  return (<div>
    <CrudTable data={items} onEdit={openE} onDelete={del} onDeleteBatch={delB} onAdd={openC} emptyMessage="Sin gastos fijos" title="Gastos Fijos Mensuales" titleIcon="📋" accentColor="var(--color-blue)" addLabel="+ Nuevo" totalRow={<tr className="font-bold" style={{background:'var(--color-blue-light)'}}><td colSpan="4">TOTAL</td><td className="text-right text-red">{total.toFixed(2)}{cur}</td><td className="text-sm text-muted-foreground hidden md:table-cell">Pagado: {paid.toFixed(2)}{cur}</td></tr>} columns={[
      {key:'category',label:'Categoria',format:(i:any)=><span className="badge" style={{background:'var(--color-blue-light)',color:'var(--color-blue)'}}>{i.category}</span>},
      {key:'concept',label:'Concepto',format:(i:any)=><strong>{i.concept}</strong>},
      {key:'provider',label:'Proveedor',hideOnMobile:true},
      {key:'amount',label:'Importe',className:'text-right font-semibold',headerClassName:'text-right',format:(i:any)=><span className="text-red">{Number(i.amount).toFixed(2)}{cur}</span>},
      {key:'dueDate',label:'Dia',format:(i:any)=><span className="text-center">Dia {i.dueDate}</span>,headerClassName:'text-center'},
      {key:'paid',label:'Pagado',format:(i:any)=><span>{i.paid?'✅':'❌'}</span>,headerClassName:'text-center'},
    ]} />
    <Modal isOpen={m} onClose={()=>setM(false)} title={e?'Editar':'Nuevo Gasto Fijo'}>
      <form onSubmit={save}>
        <div className="mb-3"><label>Categoria</label><select value={f.category} onChange={ev=>setF({...f,category:ev.target.value})} className="input">{categories.map(c=><option key={c}>{c}</option>)}</select></div>
        <div className="mb-3"><label>Concepto</label><input type="text" required value={f.concept} onChange={ev=>setF({...f,concept:ev.target.value})} className="input" /></div>
        <div className="mb-3"><label>Proveedor</label><input type="text" value={f.provider} onChange={ev=>setF({...f,provider:ev.target.value})} className="input" /></div>
        <div className="grid grid-cols-2 gap-3 mb-3"><div><label>Importe ({cur})</label><input type="number" step="0.01" min="0.01" required value={f.amount} onChange={ev=>setF({...f,amount:ev.target.value})} className="input" /></div><div><label>Dia cobro</label><input type="number" min="1" max="31" value={f.dueDate} onChange={ev=>setF({...f,dueDate:ev.target.value})} className="input" /></div></div>
        <div className="flex justify-end gap-2"><button type="button" onClick={()=>setM(false)} className="px-4 py-2">Cancelar</button><button type="submit" className="px-4 py-2 rounded-lg font-medium text-white" style={{background:'var(--color-blue)'}}>Guardar</button></div>
      </form>
    </Modal>
  </div>);
}


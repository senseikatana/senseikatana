// @ts-nocheck
'use client';
import { useState } from 'react';
import { useData } from '@/context/DataProvider';
import Modal from '@/components/Modal';
import { CrudTable } from '@/components/CrudTable';

export default function DailyRegisterPage() {
  const { data, setData } = useData();
  const [m, setM] = useState(false);
  const [f, setF] = useState<any>({date:'',category:'Alimentacion',concept:'',amount:'',type:'Variable',necessary:true,notes:''});
  const cats = data.expenseCategories||[];
  const items = data.dailyRegister||[];
  const cur = data.settings?.currency||'€';

  const openC = () => {setF({date:new Date().toISOString().split('T')[0],category:'Alimentacion',concept:'',amount:'',type:'Variable',necessary:true,notes:''});setM(true)};
  const save = (ev:React.FormEvent) => {ev.preventDefault();const p={...f,amount:Number(f.amount)};const id=Math.max(0,...items.map((i:any)=>i.id))+1;setData((d:any)=>({...d,dailyRegister:[...items,{id,...p}]}));setM(false)};
  const del = (i:any) => {if(confirm('Eliminar?'))setData((d:any)=>({...d,dailyRegister:items.filter((x:any)=>x.id!==i.id)}))};
  const delB = (b:any[]) => {const ids=new Set(b.map((i:any)=>i.id));setData((d:any)=>({...d,dailyRegister:items.filter((i:any)=>!ids.has(i.id))}))};
  const total=items.reduce((s:number,i:any)=>s+Number(i.amount),0);

  return (<div>
    <CrudTable data={items} onDelete={del} onDeleteBatch={delB} onAdd={openC} emptyMessage="Sin registros" title="Registro Diario" titleIcon="📝" accentColor="var(--color-primary)" addLabel="+ Nuevo" totalRow={<tr className="font-bold" style={{background:'var(--color-red-light)'}}><td colSpan="4">TOTAL</td><td className="text-right text-red">{total.toFixed(2)}{cur}</td><td></td></tr>} columns={[
      {key:'date',label:'Fecha'},
      {key:'category',label:'Categoria',format:(i:any)=><span className="badge">{i.category}</span>},
      {key:'concept',label:'Concepto',format:(i:any)=><strong>{i.concept}</strong>},
      {key:'type',label:'Tipo',format:(i:any)=><span className="badge" style={{background:i.type==='Variable'?'var(--color-orange-light)':'var(--color-blue-light)',color:i.type==='Variable'?'var(--color-orange)':'var(--color-blue)'}}>{i.type}</span>},
      {key:'amount',label:'Importe',className:'text-right font-semibold',headerClassName:'text-right',format:(i:any)=><span className="text-red">{Number(i.amount).toFixed(2)}{cur}</span>},
    ]} />
    <Modal isOpen={m} onClose={()=>setM(false)} title="Nuevo Registro">
      <form onSubmit={save}>
        <div className="grid grid-cols-2 gap-3 mb-3"><div><label>Fecha</label><input type="date" required value={f.date} onChange={ev=>setF({...f,date:ev.target.value})} className="input" /></div><div><label>Tipo</label><select value={f.type} onChange={ev=>setF({...f,type:ev.target.value})} className="input"><option>Fijo</option><option>Variable</option><option>Extraordinario</option></select></div></div>
        <div className="mb-3"><label>Categoria</label><select value={f.category} onChange={ev=>setF({...f,category:ev.target.value})} className="input">{cats.map((c:string)=><option key={c}>{c}</option>)}</select></div>
        <div className="mb-3"><label>Concepto</label><input type="text" required value={f.concept} onChange={ev=>setF({...f,concept:ev.target.value})} className="input" /></div>
        <div className="mb-3"><label>Importe ({cur})</label><input type="number" step="0.01" min="0.01" required value={f.amount} onChange={ev=>setF({...f,amount:ev.target.value})} className="input" /></div>
        <div className="flex justify-end gap-2"><button type="button" onClick={()=>setM(false)} className="px-4 py-2">Cancelar</button><button type="submit" className="px-4 py-2 rounded-lg font-medium text-white" style={{background:'var(--color-primary)'}}>Guardar</button></div>
      </form>
    </Modal>
  </div>);
}

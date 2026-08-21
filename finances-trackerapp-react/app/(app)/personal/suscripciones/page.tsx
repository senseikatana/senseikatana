// @ts-nocheck
'use client';
import { useState } from 'react';
import { useData } from '@/context/DataProvider';
import Modal from '@/components/Modal';
import { CrudTable } from '@/components/CrudTable';

export default function SubscriptionsPage() {
  const { data, setData } = useData();
  const [m, setM] = useState(false);
  const [e, setE] = useState<any>(null);
  const [f, setF] = useState<any>({name:'',category:'',provider:'',amount:'',billingCycle:'monthly',nextPayment:'',active:true,notes:''});
  const items = data.subscriptions||[];
  const cur = data.settings?.currency||'€';

  const openC = () => {setE(null);setF({name:'',category:'Streaming',provider:'',amount:'',billingCycle:'monthly',nextPayment:new Date().toISOString().split('T')[0],active:true,notes:''});setM(true)};
  const openE = (i:any) => {setE(i);setF({...i,amount:i.amount.toString()});setM(true)};
  const save = (ev:React.FormEvent) => {ev.preventDefault();const p={...f,amount:Number(f.amount)};if(e){setData((d:any)=>({...d,subscriptions:items.map((i:any)=>i.id===e.id?{...i,...p}:i)}))}else{const id=Math.max(0,...items.map((i:any)=>i.id))+1;setData((d:any)=>({...d,subscriptions:[...items,{id,...p}]}))}setM(false)};
  const del = (i:any) => {if(confirm('Eliminar?'))setData((d:any)=>({...d,subscriptions:items.filter((x:any)=>x.id!==i.id)}))};
  const delB = (b:any[]) => {const ids=new Set(b.map((i:any)=>i.id));setData((d:any)=>({...d,subscriptions:items.filter((i:any)=>!ids.has(i.id))}))};
  const totalM=items.filter((s:any)=>s.active).reduce((t:number,s:any)=>t+(s.billingCycle==='annual'?Number(s.amount)/12:Number(s.amount)),0);

  return (<div>
    <CrudTable data={items} onEdit={openE} onDelete={del} onDeleteBatch={delB} onAdd={openC} emptyMessage="Sin suscripciones" title="Suscripciones" titleIcon="🔄" accentColor="var(--color-green)" addLabel="+ Nueva" totalRow={<tr className="font-bold" style={{background:'var(--color-green-light)'}}><td colSpan="2">TOTAL MENSUAL</td><td colSpan="5" className="text-right" style={{color:'var(--color-green)'}}>{totalM.toFixed(2)}{cur}/mes</td></tr>} columns={[
      {key:'name',label:'Nombre',format:(i:any)=><strong>{i.name}</strong>},
      {key:'category',label:'Categoria',format:(i:any)=><span className="badge" style={{background:'var(--color-green-light)',color:'var(--color-green)'}}>{i.category}</span>},
      {key:'amount',label:'Importe',className:'text-right font-semibold',headerClassName:'text-right',format:(i:any)=><span>{Number(i.amount).toFixed(2)}{cur}</span>},
      {key:'billingCycle',label:'Ciclo',format:(i:any)=><span className="badge">{i.billingCycle==='annual'?'Anual':'Mensual'}</span>,headerClassName:'text-center'},
      {key:'nextPayment',label:'Proximo pago',hideOnMobile:true},
      {key:'active',label:'Activa',format:(i:any)=><span>{i.active?'✅':'❌'}</span>,headerClassName:'text-center'},
    ]} />
    <Modal isOpen={m} onClose={()=>setM(false)} title={e?'Editar':'Nueva Suscripcion'}>
      <form onSubmit={save}>
        <div className="mb-3"><label>Nombre</label><input type="text" required value={f.name} onChange={ev=>setF({...f,name:ev.target.value})} className="input" /></div>
        <div className="grid grid-cols-2 gap-3 mb-3"><div><label>Categoria</label><input type="text" value={f.category} onChange={ev=>setF({...f,category:ev.target.value})} className="input" /></div><div><label>Proveedor</label><input type="text" value={f.provider} onChange={ev=>setF({...f,provider:ev.target.value})} className="input" /></div></div>
        <div className="grid grid-cols-3 gap-3 mb-3"><div><label>Importe ({cur})</label><input type="number" step="0.01" min="0.01" required value={f.amount} onChange={ev=>setF({...f,amount:ev.target.value})} className="input" /></div><div><label>Ciclo</label><select value={f.billingCycle} onChange={ev=>setF({...f,billingCycle:ev.target.value})} className="input"><option value="monthly">Mensual</option><option value="annual">Anual</option></select></div><div><label>Proximo pago</label><input type="date" value={f.nextPayment} onChange={ev=>setF({...f,nextPayment:ev.target.value})} className="input" /></div></div>
        <div className="mb-3"><label><input type="checkbox" checked={f.active} onChange={ev=>setF({...f,active:ev.target.checked})} /> Activa</label></div>
        <div className="flex justify-end gap-2"><button type="button" onClick={()=>setM(false)} className="px-4 py-2">Cancelar</button><button type="submit" className="px-4 py-2 rounded-lg font-medium text-white" style={{background:'var(--color-green)'}}>Guardar</button></div>
      </form>
    </Modal>
  </div>);
}

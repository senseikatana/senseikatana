// @ts-nocheck
'use client';
import { useState } from 'react';
import { useData } from '@/context/DataProvider';
import Modal from '@/components/Modal';
import { CrudTable } from '@/components/CrudTable';

export default function DeudasPage() {
  const { data, setData } = useData();
  const [m, setM] = useState(false);
  const [e, setE] = useState<any>(null);
  const [f, setF] = useState<any>({creditor:'',concept:'',total:'',paid:'0',monthlyPayment:'0',notes:''});
  const items = data.debts||[];
  const cur = data.settings?.currency||'€';

  const openC = () => {setE(null);setF({creditor:'',concept:'',total:'',paid:'0',monthlyPayment:'0',notes:''});setM(true)};
  const openE = (i:any) => {setE(i);setF({creditor:i.creditor,concept:i.concept,total:i.total.toString(),paid:i.paid.toString(),monthlyPayment:i.monthlyPayment.toString(),notes:i.notes||''});setM(true)};
  const save = (ev:React.FormEvent) => {ev.preventDefault();const p={creditor:f.creditor,concept:f.concept,total:Number(f.total),paid:Number(f.paid||0),monthlyPayment:Number(f.monthlyPayment||0),notes:f.notes};if(e){setData((d:any)=>({...d,debts:items.map((i:any)=>i.id===e.id?{...i,...p}:i)}))}else{const id=Math.max(0,...items.map((i:any)=>i.id))+1;setData((d:any)=>({...d,debts:[...items,{id,...p}]}))}setM(false)};
  const del = (i:any) => {if(confirm('Eliminar?'))setData((d:any)=>({...d,debts:items.filter((x:any)=>x.id!==i.id)}))};
  const delB = (b:any[]) => {const ids=new Set(b.map((i:any)=>i.id));setData((d:any)=>({...d,debts:items.filter((i:any)=>!ids.has(i.id))}))};
  const totalD=items.reduce((s:number,d:any)=>s+Number(d.total),0);
  const totalP=items.reduce((s:number,d:any)=>s+Number(d.paid),0);

  return (<div>
    <div className="p-4 rounded-lg mb-4" style={{background:'var(--color-red-light)'}}><div className="flex justify-between font-bold" style={{color:'var(--color-red)'}}><span>Pendiente Total</span><span>{(totalD-totalP).toFixed(2)}{cur}</span></div><div className="mt-2 h-3 bg-gray-light rounded-full overflow-hidden"><div className="h-full rounded-full bg-green" style={{width:Math.min(100,totalD>0?(totalP/totalD)*100:0)+'%'}} /></div></div>
    <CrudTable data={items} onEdit={openE} onDelete={del} onDeleteBatch={delB} onAdd={openC} emptyMessage="Sin deudas" title="Deudas" titleIcon="💳" accentColor="var(--color-red)" addLabel="+ Nueva Deuda" totalRow={<tr className="font-bold" style={{background:'var(--color-red-light)'}}><td colSpan="2">TOTAL</td><td className="text-right">{totalD.toFixed(2)}{cur}</td><td className="text-right text-green">{totalP.toFixed(2)}{cur}</td><td className="text-right" style={{color:'var(--color-red)'}}>{(totalD-totalP).toFixed(2)}{cur}</td><td className="text-right">{items.reduce((s:number,d:any)=>s+Number(d.monthlyPayment),0).toFixed(2)}{cur}</td><td></td></tr>} columns={[
      {key:'creditor',label:'Acreedor',format:(i:any)=><strong>{i.creditor}</strong>},
      {key:'concept',label:'Concepto'},
      {key:'total',label:'Total',className:'text-right',headerClassName:'text-right',format:(i:any)=><span>{Number(i.total).toFixed(2)}{cur}</span>},
      {key:'paid',label:'Pagado',className:'text-right',headerClassName:'text-right',format:(i:any)=><span className="text-green">{Number(i.paid).toFixed(2)}{cur}</span>},
      {key:'monthlyPayment',label:'Cuota/mes',className:'text-right',headerClassName:'text-right',format:(i:any)=><span>{Number(i.monthlyPayment).toFixed(2)}{cur}</span>},
    ]} />
    <Modal isOpen={m} onClose={()=>setM(false)} title={e?'Editar':'Nueva Deuda'}>
      <form onSubmit={save}>
        <div className="grid grid-cols-2 gap-3 mb-3"><div><label>Acreedor</label><input type="text" required value={f.creditor} onChange={ev=>setF({...f,creditor:ev.target.value})} className="input" /></div><div><label>Concepto</label><input type="text" required value={f.concept} onChange={ev=>setF({...f,concept:ev.target.value})} className="input" /></div></div>
        <div className="grid grid-cols-3 gap-3 mb-3"><div><label>Total ({cur})</label><input type="number" step="0.01" min="0.01" required value={f.total} onChange={ev=>setF({...f,total:ev.target.value})} className="input" /></div><div><label>Pagado ({cur})</label><input type="number" step="0.01" min="0" required value={f.paid} onChange={ev=>setF({...f,paid:ev.target.value})} className="input" /></div><div><label>Cuota/mes ({cur})</label><input type="number" step="0.01" min="0" value={f.monthlyPayment} onChange={ev=>setF({...f,monthlyPayment:ev.target.value})} className="input" /></div></div>
        <div className="mb-3"><label>Notas</label><textarea value={f.notes} onChange={ev=>setF({...f,notes:ev.target.value})} className="input" rows={2} /></div>
        <div className="flex justify-end gap-2"><button type="button" onClick={()=>setM(false)} className="px-4 py-2">Cancelar</button><button type="submit" className="px-4 py-2 rounded-lg font-medium text-white" style={{background:'var(--color-red)'}}>Guardar</button></div>
      </form>
    </Modal>
  </div>);
}

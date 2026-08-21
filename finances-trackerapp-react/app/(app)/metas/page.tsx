// @ts-nocheck
'use client';
import { useState } from 'react';
import { useData } from '@/context/DataProvider';
import Modal from '@/components/Modal';
import { CrudTable } from '@/components/CrudTable';

export default function MetasPage() {
  const { data, setData } = useData();
  const [m, setM] = useState(false);
  const [e, setE] = useState<any>(null);
  const [f, setF] = useState<any>({name:'',target:'',saved:'0'});
  const items = data.savingsGoals||[];
  const cur = data.settings?.currency||'€';

  const openC = () => {setE(null);setF({name:'',target:'',saved:'0'});setM(true)};
  const openE = (i:any) => {setE(i);setF({name:i.name,target:i.target.toString(),saved:i.saved.toString()});setM(true)};
  const save = (ev:React.FormEvent) => {ev.preventDefault();const p={name:f.name,target:Number(f.target),saved:Number(f.saved)};if(e){setData((d:any)=>({...d,savingsGoals:items.map((i:any)=>i.id===e.id?{...i,...p}:i)}))}else{const id=Math.max(0,...items.map((i:any)=>i.id))+1;setData((d:any)=>({...d,savingsGoals:[...items,{id,...p}]}))}setM(false)};
  const del = (i:any) => {if(confirm('Eliminar?'))setData((d:any)=>({...d,savingsGoals:items.filter((x:any)=>x.id!==i.id)}))};
  const delB = (b:any[]) => {const ids=new Set(b.map((i:any)=>i.id));setData((d:any)=>({...d,savingsGoals:items.filter((i:any)=>!ids.has(i.id))}))};
  const totalS=items.reduce((s:number,g:any)=>s+Number(g.saved),0);
  const totalT=items.reduce((s:number,g:any)=>s+Number(g.target),0);

  return (<div>
    <div className="p-4 rounded-lg mb-4" style={{background:'var(--color-green-light)'}}><div className="flex justify-between font-bold"><span>Total Ahorrado</span><span>{totalS.toFixed(2)}{cur} / {totalT.toFixed(2)}{cur} ({totalT>0?((totalS/totalT)*100).toFixed(0):0}%)</span></div><div className="mt-2 h-3 bg-gray-light rounded-full overflow-hidden"><div className="h-full rounded-full bg-green" style={{width:Math.min(100,totalT>0?(totalS/totalT)*100:0)+'%'}} /></div></div>
    <CrudTable data={items} onEdit={openE} onDelete={del} onDeleteBatch={delB} onAdd={openC} emptyMessage="Sin metas" title="Metas de Ahorro" titleIcon="🏦" accentColor="var(--color-green)" addLabel="+ Nueva Meta" columns={[
      {key:'name',label:'Nombre',format:(i:any)=><strong>{i.name}</strong>},
      {key:'target',label:'Objetivo',className:'text-right',headerClassName:'text-right',format:(i:any)=><span>{Number(i.target).toFixed(2)}{cur}</span>},
      {key:'saved',label:'Ahorrado',className:'text-right font-semibold',headerClassName:'text-right',format:(i:any)=><span className="text-green">{Number(i.saved).toFixed(2)}{cur}</span>},
    ]} />
    <Modal isOpen={m} onClose={()=>setM(false)} title={e?'Editar':'Nueva Meta'}>
      <form onSubmit={save}>
        <div className="mb-3"><label>Nombre</label><input type="text" required value={f.name} onChange={ev=>setF({...f,name:ev.target.value})} className="input" /></div>
        <div className="grid grid-cols-2 gap-3 mb-4"><div><label>Objetivo ({cur})</label><input type="number" step="0.01" min="0.01" required value={f.target} onChange={ev=>setF({...f,target:ev.target.value})} className="input" /></div><div><label>Ahorrado ({cur})</label><input type="number" step="0.01" min="0" required value={f.saved} onChange={ev=>setF({...f,saved:ev.target.value})} className="input" /></div></div>
        <div className="flex justify-end gap-2"><button type="button" onClick={()=>setM(false)} className="px-4 py-2">Cancelar</button><button type="submit" className="px-4 py-2 rounded-lg font-medium text-white" style={{background:'var(--color-green)'}}>Guardar</button></div>
      </form>
    </Modal>
  </div>);
}

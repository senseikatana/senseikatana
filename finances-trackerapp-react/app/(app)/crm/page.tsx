// @ts-nocheck
'use client';
import { useState } from 'react';
import { useData } from '@/context/DataProvider';
import Modal from '@/components/Modal';
import { CrudTable } from '@/components/CrudTable';

export default function CRMPage() {
  const { data, setData } = useData();
  const [m, setM] = useState(false);
  const [e, setE] = useState<any>(null);
  const [f, setF] = useState<any>({name:'',type:'Cliente',status:'Prospecto',value:'',phone:'',email:'',notes:'',lastContact:''});
  const items = data.crmContacts||[];
  const cur = data.settings?.currency||'€';
  const types = ['Cliente','Proveedor','Lead','Partner','Inversor','Otro'];
  const statuses = ['Prospecto','Contactado','En negociacion','Propuesta enviada','Ganado','Perdido','Archivado'];
  const sc = {Prospecto:{bg:'var(--color-gray-light)',co:'var(--color-gray)'},Contactado:{bg:'var(--color-blue-light)',co:'var(--color-blue)'},'En negociacion':{bg:'var(--color-orange-light)',co:'var(--color-orange)'},'Propuesta enviada':{bg:'var(--color-orange-light)',co:'var(--color-orange)'},Ganado:{bg:'var(--color-green-light)',co:'var(--color-green)'},Perdido:{bg:'var(--color-red-light)',co:'var(--color-red)'},Archivado:{bg:'var(--color-gray-light)',co:'var(--color-gray)'}};

  const openC = () => {setE(null);setF({name:'',type:'Cliente',status:'Prospecto',value:'',phone:'',email:'',notes:'',lastContact:new Date().toISOString().split('T')[0]});setM(true)};
  const openE = (i:any) => {setE(i);setF({...i,value:i.value?.toString()||''});setM(true)};
  const save = (ev:React.FormEvent) => {ev.preventDefault();const p={...f,value:Number(f.value)||0};if(e){setData((d:any)=>({...d,crmContacts:items.map((i:any)=>i.id===e.id?{...i,...p}:i)}))}else{const id=Math.max(0,...items.map((i:any)=>i.id))+1;setData((d:any)=>({...d,crmContacts:[...items,{id,...p}]}))}setM(false)};
  const del = (i:any) => {if(confirm('Eliminar?'))setData((d:any)=>({...d,crmContacts:items.filter((x:any)=>x.id!==i.id)}))};
  const delB = (b:any[]) => {const ids=new Set(b.map((i:any)=>i.id));setData((d:any)=>({...d,crmContacts:items.filter((i:any)=>!ids.has(i.id))}))};
  const totalV=items.reduce((s:number,i:any)=>s+(Number(i.value)||0),0);

  return (<div>
    <CrudTable data={items} onEdit={openE} onDelete={del} onDeleteBatch={delB} onAdd={openC} emptyMessage="Sin contactos CRM" title="CRM - Relaciones" titleIcon="🤝" accentColor="var(--color-blue)" addLabel="+ Nuevo Contacto" totalRow={<tr className="font-bold" style={{background:'var(--color-blue-light)'}}><td colSpan="3">TOTAL ({items.length})</td><td className="text-right" style={{color:'var(--color-blue)'}}>{totalV.toFixed(2)}{cur}</td><td colSpan="3"></td></tr>} columns={[
      {key:'name',label:'Nombre',format:(i:any)=><strong>{i.name}</strong>},
      {key:'type',label:'Tipo',format:(i:any)=><span className="badge" style={{background:'var(--color-blue-light)',color:'var(--color-blue)'}}>{i.type}</span>},
      {key:'status',label:'Estado',format:(i:any)=><span className="badge" style={{background:(sc[i.status]||sc.Prospecto).bg,color:(sc[i.status]||sc.Prospecto).co}}>{i.status}</span>},
      {key:'value',label:'Valor',className:'text-right font-semibold',headerClassName:'text-right',format:(i:any)=><span>{Number(i.value).toFixed(2)}{cur}</span>},
      {key:'phone',label:'Telefono',hideOnMobile:true},
      {key:'email',label:'Email',hideOnMobile:true},
    ]} />
    <Modal isOpen={m} onClose={()=>setM(false)} title={e?'Editar':'Nuevo Contacto'}>
      <form onSubmit={save}>
        <div className="mb-3"><label>Nombre</label><input type="text" required value={f.name} onChange={ev=>setF({...f,name:ev.target.value})} className="input" /></div>
        <div className="grid grid-cols-2 gap-3 mb-3"><div><label>Tipo</label><select value={f.type} onChange={ev=>setF({...f,type:ev.target.value})} className="input">{types.map(t=><option key={t}>{t}</option>)}</select></div><div><label>Estado</label><select value={f.status} onChange={ev=>setF({...f,status:ev.target.value})} className="input">{statuses.map(s=><option key={s}>{s}</option>)}</select></div></div>
        <div className="grid grid-cols-2 gap-3 mb-3"><div><label>Valor ({cur})</label><input type="number" step="0.01" min="0" value={f.value} onChange={ev=>setF({...f,value:ev.target.value})} className="input" /></div><div><label>Ultimo contacto</label><input type="date" value={f.lastContact} onChange={ev=>setF({...f,lastContact:ev.target.value})} className="input" /></div></div>
        <div className="grid grid-cols-2 gap-3 mb-3"><div><label>Telefono</label><input type="text" value={f.phone} onChange={ev=>setF({...f,phone:ev.target.value})} className="input" /></div><div><label>Email</label><input type="email" value={f.email} onChange={ev=>setF({...f,email:ev.target.value})} className="input" /></div></div>
        <div className="mb-3"><label>Notas</label><textarea value={f.notes} onChange={ev=>setF({...f,notes:ev.target.value})} className="input" rows={2} /></div>
        <div className="flex justify-end gap-2"><button type="button" onClick={()=>setM(false)} className="px-4 py-2">Cancelar</button><button type="submit" className="px-4 py-2 rounded-lg font-medium text-white" style={{background:'var(--color-blue)'}}>Guardar</button></div>
      </form>
    </Modal>
  </div>);
}

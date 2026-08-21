// @ts-nocheck
'use client';
import { useState, useRef } from 'react';
import { useData } from '@/context/DataProvider';
import Modal from '@/components/Modal';
import { CrudTable } from '@/components/CrudTable';

export default function TicketsPage() {
  const { data, setData } = useData();
  const [m, setM] = useState(false);
  const [e, setE] = useState(null);
  const [f, setF] = useState({date:'',concept:'',category:'Alimentacion',amount:'',type:'personal',status:'Pendiente',files:[],notes:''});
  const [files, setFiles] = useState([]);
  const fiRef = useRef(null);
  const items = data.tickets||[];
  const cur = data.settings?.currency||'€';
  const cats = data.ticketCategories||['Alimentacion','Transporte','Oficina','Suministros','Marketing','Restaurantes','Hospedaje','Viajes','Otros'];
  const sc = {Pendiente:{bg:'var(--color-orange-light)',co:'var(--color-orange)'},Procesado:{bg:'var(--color-blue-light)',co:'var(--color-blue)'},Validado:{bg:'var(--color-green-light)',co:'var(--color-green)'},Archivado:{bg:'var(--color-gray-light)',co:'var(--color-gray)'},Rechazado:{bg:'var(--color-red-light)',co:'var(--color-red)'}};

  const openC = () => {setE(null);setF({date:new Date().toISOString().split('T')[0],concept:'',category:'Alimentacion',amount:'',type:'personal',status:'Pendiente',files:[],notes:''});setFiles([]);setM(true)};
  const openE = (i) => {setE(i);setF({...i,amount:i.amount.toString()});setFiles([]);setM(true)};
  const handleFile = (ev) => {if(ev.target.files)setFiles(p=>[...p,...Array.from(ev.target.files)])};
  const save = (ev) => {ev.preventDefault();const names=files.map(x=>x.name);const p={...f,amount:Number(f.amount),files:[...f.files,...names]};if(e){setData(d=>({...d,tickets:items.map(i=>i.id===e.id?{...i,...p}:i)}))}else{const id=Math.max(0,...items.map(i=>i.id))+1;setData(d=>({...d,tickets:[...items,{id,...p}]}))}setM(false)};
  const del = (i) => {if(confirm('Eliminar?'))setData(d=>({...d,tickets:items.filter(x=>x.id!==i.id)}))};
  const delB = (b) => {const ids=new Set(b.map(i=>i.id));setData(d=>({...d,tickets:items.filter(i=>!ids.has(i.id))}))};
  const total=items.reduce((s,i)=>s+Number(i.amount),0);

  return (<div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
      <div className="p-3 rounded-lg" style={{background:'var(--color-orange-light)'}}><div className="text-xs text-muted-foreground">Pendientes</div><div className="text-xl font-bold" style={{color:'var(--color-orange)'}}>{items.filter(i=>i.status==='Pendiente').length}</div></div>
      <div className="p-3 rounded-lg" style={{background:'var(--color-green-light)'}}><div className="text-xs text-muted-foreground">Validados</div><div className="text-xl font-bold" style={{color:'var(--color-green)'}}>{items.filter(i=>i.status==='Validado').length}</div></div>
      <div className="p-3 rounded-lg" style={{background:'var(--color-primary-50)'}}><div className="text-xs text-muted-foreground">Total</div><div className="text-xl font-bold" style={{color:'var(--color-primary)'}}>{items.length}</div></div>
      <div className="p-3 rounded-lg" style={{background:'var(--color-blue-light)'}}><div className="text-xs text-muted-foreground">Importe</div><div className="text-xl font-bold" style={{color:'var(--color-blue)'}}>{total.toFixed(2)}{cur}</div></div>
    </div>
    <CrudTable data={items} onEdit={openE} onDelete={del} onDeleteBatch={delB} onAdd={openC} emptyMessage="Sin tickets" title="Tickets y Recibos" titleIcon="🎫" accentColor="var(--color-primary)" addLabel="+ Nuevo Ticket" columns={[
      {key:'date',label:'Fecha'},
      {key:'concept',label:'Concepto',format:(i)=><strong>{i.concept}</strong>},
      {key:'category',label:'Categoria',format:(i)=><span className="badge">{i.category}</span>},
      {key:'type',label:'Tipo',format:(i)=><span className="badge" style={{background:i.type==='negocio'?'var(--color-blue-light)':'var(--color-gray-light)',color:i.type==='negocio'?'var(--color-blue)':'var(--color-gray-dark)'}}>{i.type==='negocio'?'Negocio':'Personal'}</span>},
      {key:'amount',label:'Importe',className:'text-right font-semibold',headerClassName:'text-right',format:(i)=><span>{Number(i.amount).toFixed(2)}{cur}</span>},
      {key:'status',label:'Estado',format:(i)=><span className="badge" style={{background:(sc[i.status]||sc.Pendiente).bg,color:(sc[i.status]||sc.Pendiente).co}}>{i.status}</span>},
      {key:'files',label:'Archivos',format:(i)=><span>{i.files&&i.files.length>0?'📎 '+i.files.length:'—'}</span>,hideOnMobile:true},
    ]} />
    <Modal isOpen={m} onClose={()=>setM(false)} title={e?'Editar':'Nuevo Ticket'}>
      <form onSubmit={save}>
        <div className="grid grid-cols-2 gap-3 mb-3"><div><label>Fecha</label><input type="date" required value={f.date} onChange={ev=>setF({...f,date:ev.target.value})} className="input" /></div><div><label>Tipo</label><select value={f.type} onChange={ev=>setF({...f,type:ev.target.value})} className="input"><option value="personal">Personal</option><option value="negocio">Negocio</option></select></div></div>
        <div className="mb-3"><label>Concepto</label><input type="text" required value={f.concept} onChange={ev=>setF({...f,concept:ev.target.value})} className="input" /></div>
        <div className="grid grid-cols-2 gap-3 mb-3"><div><label>Categoria</label><select value={f.category} onChange={ev=>setF({...f,category:ev.target.value})} className="input">{cats.map(c=><option key={c}>{c}</option>)}</select></div><div><label>Importe ({cur})</label><input type="number" step="0.01" min="0.01" required value={f.amount} onChange={ev=>setF({...f,amount:ev.target.value})} className="input" /></div></div>
        <div className="mb-3"><label>Estado</label><select value={f.status} onChange={ev=>setF({...f,status:ev.target.value})} className="input"><option>Pendiente</option><option>Procesado</option><option>Validado</option><option>Archivado</option><option>Rechazado</option></select></div>
        <div className="mb-3"><label>Archivos</label><div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50" onClick={()=>fiRef.current&&fiRef.current.click()}><input ref={fiRef} type="file" accept="image/*,.pdf" multiple onChange={handleFile} className="hidden" /><div className="text-2xl mb-1">📷</div><p className="text-sm text-muted-foreground">Sube fotos de tickets o PDFs</p></div>
          {files.length>0&&<div className="mt-2 space-y-1">{files.map((fl,i)=><div key={i} className="flex items-center justify-between bg-gray-50 p-2 rounded text-sm"><span>📎 {fl.name}</span><button type="button" onClick={()=>setFiles(p=>p.filter((_,idx)=>idx!==i))} className="text-red text-xs">✕</button></div>)}</div>}
        </div>
        <div className="mb-3"><label>Notas</label><textarea value={f.notes} onChange={ev=>setF({...f,notes:ev.target.value})} className="input" rows={2} /></div>
        <div className="flex justify-end gap-2"><button type="button" onClick={()=>setM(false)} className="px-4 py-2">Cancelar</button><button type="submit" className="px-4 py-2 rounded-lg font-medium text-white" style={{background:'var(--color-primary)'}}>Guardar</button></div>
      </form>
    </Modal>
  </div>);
}


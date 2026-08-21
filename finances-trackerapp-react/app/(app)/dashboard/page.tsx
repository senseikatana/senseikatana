// @ts-nocheck
'use client';

import { useData } from '@/context/DataProvider';
import { MONTHS, CURRENT_YEAR, sampleData } from '@/data/defaultData';
import Link from 'next/link';

export default function DashboardPage() {
  const { data, setData } = useData();
  const selectedMonth = data.settings?.month || '';
  const selectedYear = Number(data.settings?.year || CURRENT_YEAR);
  const cur = data.settings?.currency || '€';

  const isSelectedPeriod = (dateStr: string) => {
    if (!dateStr) return false;
    const [y, m] = dateStr.split('-');
    return MONTHS[parseInt(m, 10) - 1] === selectedMonth && parseInt(y, 10) === selectedYear;
  };

  const n = (x: any) => Number(x) || 0;
  const f = (x: any) => n(x).toFixed(2);

  var incT = (data.income || []).filter((i: any) => isSelectedPeriod(i.date)).reduce((s: number, i: any) => s + n(i.amount), 0);
  var fixT = (data.fixedExpenses || []).reduce((s: number, e: any) => s + n(e.amount), 0);
  var varT = (data.variableExpenses || []).filter((e: any) => isSelectedPeriod(e.date)).reduce((s: number, e: any) => s + n(e.amount), 0);
  var dayT = (data.dailyRegister || []).filter((e: any) => isSelectedPeriod(e.date)).reduce((s: number, e: any) => s + n(e.amount), 0);
  var subsM = (data.subscriptions || []).filter((s: any) => s.active).reduce((t: number, s: any) => t + (s.billingCycle === 'annual' ? n(s.amount) / 12 : n(s.amount)), 0);
  var totExp = fixT + varT + dayT + subsM;
  var net = incT - totExp;
  var savR = incT > 0 ? (net / incT) * 100 : 0;
  var bizInc = (data.businessIncome || []).filter((i: any) => isSelectedPeriod(i.date)).reduce((s: number, i: any) => s + n(i.amount), 0);
  var bizExp = (data.businessExpenses || []).filter((e: any) => isSelectedPeriod(e.date)).reduce((s: number, e: any) => s + n(e.amount), 0);
  var bizNet = bizInc - bizExp;
  var totalSav = (data.savingsGoals || []).reduce((s: number, g: any) => s + n(g.saved), 0);
  var totalTgt = (data.savingsGoals || []).reduce((s: number, g: any) => s + n(g.target), 0);
  var savProg = totalTgt > 0 ? (totalSav / totalTgt) * 100 : 0;
  var activeDeals = (data.crmContacts || []).filter((c: any) => !['Ganado', 'Perdido', 'Archivado'].includes(c.status));
  var pendTix = (data.tickets || []).filter((t: any) => t.status === 'Pendiente');

  const hasData = (data.income?.length || 0) + (data.fixedExpenses?.length || 0) + (data.variableExpenses?.length || 0) + (data.businessIncome?.length || 0) > 0;

  const loadSampleData = () => {
    if (confirm('Cargar datos de ejemplo? Esto reemplazara tus datos actuales.')) {
      setData(sampleData);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-primary">Panel de Control</h1>
        <div className="flex gap-2">
          <select value={data.settings?.month} onChange={e => setData((d: any) => ({...d, settings: {...d.settings, month: e.target.value}}))} className="input w-32">
            {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <select value={data.settings?.year} onChange={e => setData((d: any) => ({...d, settings: {...d.settings, year: Number(e.target.value)}}))} className="input w-24">
            {[-1, 0, 1, 2].map(o => { var y = CURRENT_YEAR + o; return <option key={y} value={y}>{y}</option>; })}
          </select>
        </div>
      </div>

      {!hasData && (
        <div className="card mb-6 text-center py-8">
          <div className="text-4xl mb-3">📊</div>
          <h3 className="font-bold text-lg mb-2">Bienvenido a Finanzas App</h3>
          <p className="text-muted-foreground mb-4">No hay datos aun. Puedes empezar agregando ingresos o cargar datos de ejemplo.</p>
          <div className="flex justify-center gap-3">
            <Link href="/personal/ingresos" className="px-4 py-2 rounded-lg font-medium text-white" style={{background:'var(--color-green)'}}>💰 Agregar primer ingreso</Link>
            <button onClick={loadSampleData} className="px-4 py-2 rounded-lg font-medium text-white" style={{background:'var(--color-blue)'}}>📊 Cargar datos de ejemplo</button>
          </div>
        </div>
      )}

      <h2 className="text-lg font-semibold mb-3">💰 Finanzas Personales</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Link href="/personal/ingresos"><div className="card hover:shadow-md transition-shadow"><div className="text-xs text-muted-foreground mb-1">INGRESOS</div><div className="text-2xl font-bold text-green">{f(incT)}{cur}</div></div></Link>
        <Link href="/personal/gastos-fijos"><div className="card hover:shadow-md transition-shadow"><div className="text-xs text-muted-foreground mb-1">GASTOS</div><div className="text-2xl font-bold text-red">{f(totExp)}{cur}</div></div></Link>
        <div className="card"><div className="text-xs text-muted-foreground mb-1">SALDO NETO</div><div className={'text-2xl font-bold ' + (net >= 0 ? 'text-green' : 'text-red')}>{net >= 0 ? '+' : ''}{f(net)}{cur}</div></div>
        <Link href="/metas"><div className="card hover:shadow-md transition-shadow"><div className="text-xs text-muted-foreground mb-1">TASA AHORRO</div><div className="text-2xl font-bold text-green">{savR.toFixed(1)}%</div></div></Link>
      </div>

      <h2 className="text-lg font-semibold mb-3">💼 Negocio</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <Link href="/negocios/ingresos"><div className="card hover:shadow-md transition-shadow"><div className="text-xs text-muted-foreground mb-1">INGRESOS NEGOCIO</div><div className="text-2xl font-bold text-green">{f(bizInc)}{cur}</div></div></Link>
        <Link href="/negocios/gastos"><div className="card hover:shadow-md transition-shadow"><div className="text-xs text-muted-foreground mb-1">GASTOS NEGOCIO</div><div className="text-2xl font-bold text-red">{f(bizExp)}{cur}</div></div></Link>
        <Link href="/presupuestos"><div className="card hover:shadow-md transition-shadow"><div className="text-xs text-muted-foreground mb-1">NETO NEGOCIO</div><div className={'text-2xl font-bold ' + (bizNet >= 0 ? 'text-green' : 'text-red')}>{bizNet >= 0 ? '+' : ''}{f(bizNet)}{cur}</div></div></Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Link href="/crm"><div className="card hover:shadow-md transition-shadow"><div className="text-xs text-muted-foreground mb-2">🤝 CRM</div><div className="text-3xl font-bold text-primary">{activeDeals.length}</div><div className="text-xs text-muted-foreground">tratos activos</div></div></Link>
        <Link href="/tickets"><div className="card hover:shadow-md transition-shadow"><div className="text-xs text-muted-foreground mb-2">🎫 Tickets</div><div className="text-3xl font-bold text-orange">{pendTix.length}</div><div className="text-xs text-muted-foreground">pendientes</div></div></Link>
        <Link href="/metas"><div className="card hover:shadow-md transition-shadow"><div className="text-xs text-muted-foreground mb-2">🏦 Ahorro</div><div className="text-3xl font-bold text-green">{f(totalSav)}{cur}</div><div className="mt-2 h-2 bg-gray-light rounded-full overflow-hidden"><div className="h-full rounded-full bg-green" style={{width: Math.min(100, savProg) + '%'}} /></div></div></Link>
      </div>

      <div className="card">
        <h3 className="font-semibold mb-3 text-primary">Desglose Gastos Personales</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="p-3 rounded-lg" style={{background:'var(--color-blue-light)'}}><div className="text-xs text-muted-foreground">Fijos</div><div className="font-bold text-blue">{f(fixT)}{cur}</div></div>
          <div className="p-3 rounded-lg" style={{background:'var(--color-orange-light)'}}><div className="text-xs text-muted-foreground">Variables</div><div className="font-bold text-orange">{f(varT)}{cur}</div></div>
          <div className="p-3 rounded-lg" style={{background:'var(--color-red-light)'}}><div className="text-xs text-muted-foreground">Diario</div><div className="font-bold text-red">{f(dayT)}{cur}</div></div>
          <div className="p-3 rounded-lg" style={{background:'var(--color-green-light)'}}><div className="text-xs text-muted-foreground">Suscripciones</div><div className="font-bold text-green">{f(subsM)}{cur}</div></div>
          <div className="p-3 rounded-lg" style={{background:'var(--color-gray-light)'}}><div className="text-xs text-muted-foreground">Total</div><div className="font-bold text-primary">{f(totExp)}{cur}</div></div>
        </div>
      </div>
    </div>
  );
}


'use client';
import { useData } from '@/context/DataProvider';
import { MONTHS, CURRENT_YEAR } from '@/data/defaultData';
import Link from 'next/link';

export default function DashboardPage() {
  const { data } = useData();
  const selectedMonth = data.settings?.month || '';
  const selectedYear = Number(data.settings?.year || CURRENT_YEAR);
  const currency = data.settings?.currency || '€';

  const isSelectedPeriod = (dateStr) => {
    if (!dateStr) return false;
    const [y, m] = dateStr.split('-');
    return MONTHS[parseInt(m, 10) - 1] === selectedMonth && parseInt(y, 10) === selectedYear;
  };

  const n = (x) => Number(x) || 0;
  const f = (x) => n(x).toFixed(2);

  var incT = (data.income || []).filter(function(i){return isSelectedPeriod(i.date);}).reduce(function(s,i){return s+n(i.amount);},0);
  var fixT = (data.fixedExpenses || []).reduce(function(s,e){return s+n(e.amount);},0);
  var varT = (data.variableExpenses || []).filter(function(e){return isSelectedPeriod(e.date);}).reduce(function(s,e){return s+n(e.amount);},0);
  var dayT = (data.dailyRegister || []).filter(function(e){return isSelectedPeriod(e.date);}).reduce(function(s,e){return s+n(e.amount);},0);
  var subsM = (data.subscriptions || []).filter(function(s){return s.active;}).reduce(function(t,s){var a=n(s.amount);return t+(s.billingCycle==='annual'?a/12:a);},0);
  var totExp = fixT+varT+dayT+subsM;
  var net = incT-totExp;
  var savR = incT>0?(net/incT)*100:0;
  var bizInc = (data.businessIncome||[]).filter(function(i){return isSelectedPeriod(i.date);}).reduce(function(s,i){return s+n(i.amount);},0);
  var bizExp = (data.businessExpenses||[]).filter(function(e){return isSelectedPeriod(e.date);}).reduce(function(s,e){return s+n(e.amount);},0);
  var bizNet = bizInc-bizExp;
  var totalSav = (data.savingsGoals||[]).reduce(function(s,g){return s+n(g.saved);},0);
  var totalTgt = (data.savingsGoals||[]).reduce(function(s,g){return s+n(g.target);},0);
  var savProg = totalTgt>0?(totalSav/totalTgt)*100:0;
  var activeDeals = (data.crmContacts||[]).filter(function(c){return!['Ganado','Perdido','Archivado'].includes(c.status);});
  var pendTix = (data.tickets||[]).filter(function(t){return t.status==='Pendiente';});

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-primary">Panel de Control</h1>
        <select value={data.settings?.month} onChange={function(e){}} className="input w-32">
          {MONTHS.map(function(m){return <option key={m} value={m}>{m}</option>;})}
        </select>
      </div>

      <h2 className="text-lg font-semibold mb-3">💰 Finanzas Personales</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Link href="/personal/ingresos"><div className="card"><div className="text-xs text-muted-foreground mb-1">INGRESOS</div><div className="text-2xl font-bold text-green">{f(incT)}{currency}</div></div></Link>
        <Link href="/personal/gastos-fijos"><div className="card"><div className="text-xs text-muted-foreground mb-1">GASTOS</div><div className="text-2xl font-bold text-red">{f(totExp)}{currency}</div></div></Link>
        <div className="card"><div className="text-xs text-muted-foreground mb-1">SALDO NETO</div><div className={'text-2xl font-bold '+(net>=0?'text-green':'text-red')}>{net>=0?'+':''}{f(net)}{currency}</div></div>
        <Link href="/metas"><div className="card"><div className="text-xs text-muted-foreground mb-1">TASA AHORRO</div><div className="text-2xl font-bold text-green">{savR.toFixed(1)}%</div></div></Link>
      </div>

      <h2 className="text-lg font-semibold mb-3">💼 Negocio</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <Link href="/negocios/ingresos"><div className="card"><div className="text-xs text-muted-foreground mb-1">INGRESOS NEGOCIO</div><div className="text-2xl font-bold text-green">{f(bizInc)}{currency}</div></div></Link>
        <Link href="/negocios/gastos"><div className="card"><div className="text-xs text-muted-foreground mb-1">GASTOS NEGOCIO</div><div className="text-2xl font-bold text-red">{f(bizExp)}{currency}</div></div></Link>
        <Link href="/negocios/presupuesto"><div className="card"><div className="text-xs text-muted-foreground mb-1">NETO NEGOCIO</div><div className={'text-2xl font-bold '+(bizNet>=0?'text-green':'text-red')}>{bizNet>=0?'+':''}{f(bizNet)}{currency}</div></div></Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Link href="/crm"><div className="card"><div className="text-xs text-muted-foreground mb-2">🤝 CRM - Tratos Activos</div><div className="text-3xl font-bold text-primary">{activeDeals.length}</div></div></Link>
        <Link href="/tickets"><div className="card"><div className="text-xs text-muted-foreground mb-2">🎫 Tickets Pendientes</div><div className="text-3xl font-bold text-orange">{pendTix.length}</div></div></Link>
        <Link href="/metas"><div className="card"><div className="text-xs text-muted-foreground mb-2">🏦 Ahorro Total</div><div className="text-3xl font-bold text-green">{f(totalSav)}{currency}</div><div className="mt-2 h-2 bg-gray-light rounded-full overflow-hidden"><div className="h-full rounded-full bg-green" style={{width:Math.min(100,savProg)+'%'}} /></div></div></Link>
      </div>

      <div className="card"><h3 className="font-semibold mb-3 text-primary">Desglose Gastos Personales</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="p-3 rounded-lg" style={{background:'var(--color-blue-light)'}}><div className="text-xs text-muted-foreground">Fijos</div><div className="font-bold text-blue">{f(fixT)}{currency}</div></div>
          <div className="p-3 rounded-lg" style={{background:'var(--color-orange-light)'}}><div className="text-xs text-muted-foreground">Variables</div><div className="font-bold text-orange">{f(varT)}{currency}</div></div>
          <div className="p-3 rounded-lg" style={{background:'var(--color-red-light)'}}><div className="text-xs text-muted-foreground">Diario</div><div className="font-bold text-red">{f(dayT)}{currency}</div></div>
          <div className="p-3 rounded-lg" style={{background:'var(--color-green-light)'}}><div className="text-xs text-muted-foreground">Suscripciones</div><div className="font-bold text-green">{f(subsM)}{currency}</div></div>
          <div className="p-3 rounded-lg" style={{background:'var(--color-gray-light)'}}><div className="text-xs text-muted-foreground">Total</div><div className="font-bold text-primary">{f(totExp)}{currency}</div></div>
        </div>
      </div>
    </div>
  );
}

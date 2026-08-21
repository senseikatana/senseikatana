// @ts-nocheck
'use client';
import { useState } from 'react';
import { useData } from '@/context/DataProvider';

export default function SincronizacionPage() {
  const { data } = useData();
  const [sheetId, setSheetId] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const stats = {
    income: (data.income||[]).length,
    fixed: (data.fixedExpenses||[]).length,
    variable: (data.variableExpenses||[]).length,
    subs: (data.subscriptions||[]).length,
    bizInc: (data.businessIncome||[]).length,
    bizExp: (data.businessExpenses||[]).length,
    crm: (data.crmContacts||[]).length,
    tickets: (data.tickets||[]).length,
    goals: (data.savingsGoals||[]).length,
    debts: (data.debts||[]).length,
  };

  const exportToSheet = async () => {
    if (!sheetId.trim()) {
      setStatus('Introduce el ID de la hoja de Google Sheets');
      return;
    }
    setLoading(true);
    setStatus('Preparando datos para exportar...');
    
    // Build CSV content for the sheet
    const lines = [];
    lines.push('MODULO,CATEGORIA,CONCEPTO,IMPORTE,FECHA,NOTAS');
    
    data.income?.forEach(i => {
      lines.push(['Ingresos', i.category, i.concept, i.amount, i.date, i.notes||''].join(','));
    });
    data.fixedExpenses?.forEach(e => {
      lines.push(['Gastos Fijos', e.category, e.concept, e.amount, 'Mensual', e.notes||''].join(','));
    });
    data.variableExpenses?.forEach(e => {
      lines.push(['Gastos Variables', e.category, e.concept, e.amount, e.date, e.notes||''].join(','));
    });
    data.dailyRegister?.forEach(e => {
      lines.push(['Registro Diario', e.category, e.concept, e.amount, e.date, e.notes||''].join(','));
    });
    data.subscriptions?.forEach(s => {
      lines.push(['Suscripciones', s.category, s.name, s.amount, s.nextPayment, s.notes||''].join(','));
    });
    data.businessIncome?.forEach(i => {
      lines.push(['Ingresos Negocio', i.category, i.concept, i.amount, i.date, i.client||''].join(','));
    });
    data.businessExpenses?.forEach(e => {
      lines.push(['Gastos Negocio', e.category, e.concept, e.amount, e.date, e.provider||''].join(','));
    });
    data.crmContacts?.forEach(c => {
      lines.push(['CRM', c.type, c.name, c.value, c.lastContact, c.email||c.phone||''].join(','));
    });
    data.tickets?.forEach(t => {
      lines.push(['Tickets', t.category, t.concept, t.amount, t.date, t.status||''].join(','));
    });
    data.savingsGoals?.forEach(g => {
      lines.push(['Metas', 'Ahorro', g.name, g.saved + '/' + g.target, '', ''].join(','));
    });
    data.debts?.forEach(d => {
      lines.push(['Deudas', d.creditor, d.concept, d.total + ' total, ' + d.paid + ' pagado', '', d.monthlyPayment + '/mes'].join(','));
    });

    const csv = lines.join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'finanzas_export_' + new Date().toISOString().split('T')[0] + '.csv';
    a.click();
    URL.revokeObjectURL(url);

    setStatus('✅ Archivo CSV descargado. Subelo a tu hoja de Google Sheets:');
    setStatus(s => s + '\n' + 'https://docs.google.com/spreadsheets/d/' + sheetId);
    setLoading(false);
  };

  return (
    <div>
      <div className="card">
        <h2 className="text-xl font-bold text-primary mb-2">☁️ Sincronizacion con Google Sheets</h2>
        <p className="text-muted-foreground mb-6">Exporta tus datos financieros a Google Sheets.</p>
        
        <div className="p-4 rounded-lg bg-gray-50 mb-6">
          <h3 className="font-bold mb-3">📊 Resumen de datos</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="p-3 bg-white rounded-lg border"><div className="text-xs text-muted-foreground">Ingresos</div><div className="text-lg font-bold text-green">{stats.income}</div></div>
            <div className="p-3 bg-white rounded-lg border"><div className="text-xs text-muted-foreground">Gastos Fijos</div><div className="text-lg font-bold text-red">{stats.fixed}</div></div>
            <div className="p-3 bg-white rounded-lg border"><div className="text-xs text-muted-foreground">Variables</div><div className="text-lg font-bold text-orange">{stats.variable}</div></div>
            <div className="p-3 bg-white rounded-lg border"><div className="text-xs text-muted-foreground">Negocio</div><div className="text-lg font-bold text-blue">{stats.bizInc + stats.bizExp}</div></div>
            <div className="p-3 bg-white rounded-lg border"><div className="text-xs text-muted-foreground">CRM</div><div className="text-lg font-bold text-purple">{stats.crm}</div></div>
          </div>
        </div>

        <div className="p-6 rounded-lg bg-blue-50 border border-blue-200 mb-6">
          <h3 className="font-bold mb-3 text-blue-800">🔗 Configurar Google Sheets</h3>
          <p className="text-sm text-blue-700 mb-4">
            1. Abre Google Sheets y crea una hoja nueva o usa una existente.<br/>
            2. Copia el ID de la hoja de la URL:<br/>
            <code className="block bg-white p-2 rounded mt-2 text-xs">https://docs.google.com/spreadsheets/d/<strong>SHEET_ID_AQUI</strong>/edit</code>
          </p>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={sheetId} 
              onChange={e => setSheetId(e.target.value)}
              placeholder="Pega el ID de tu hoja de Google Sheets"
              className="input flex-1"
            />
            <button 
              onClick={exportToSheet}
              disabled={loading || !sheetId.trim()}
              className="px-4 py-2 rounded-lg font-medium text-white disabled:opacity-50"
              style={{background: sheetId.trim() ? 'var(--color-green)' : 'var(--color-gray)'}}
            >
              {loading ? 'Exportando...' : 'Exportar a CSV'}
            </button>
          </div>
        </div>

        {status && (
          <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-green-800 whitespace-pre-wrap">
            {status}
          </div>
        )}

        <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200 mt-6">
          <h4 className="font-bold text-yellow-800 mb-2">💡 Proximo paso: Auto-import a Google Sheets</h4>
          <p className="text-sm text-yellow-700">
            Para sincronizar automaticamente, usa Google Apps Script en tu hoja:
          </p>
          <pre className="bg-white p-2 rounded mt-2 text-xs overflow-auto">
{(`// En tu hoja: Extensiones > Apps Script
// Copia este codigo y ejecutalo:
function importData() {
  // Tu codigo de importacion aqui
  Logger.log('Importacion completada');
}`).trim()}
          </pre>
        </div>
      </div>
    </div>
  );
}


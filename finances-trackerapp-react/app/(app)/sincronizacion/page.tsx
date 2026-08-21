// @ts-nocheck

'use client';
import { useData } from '@/context/DataProvider';

export default function SincronizacionPage() {
  const { data } = useData();
  var stats = {
    personalInc: (data.income||[]).length,
    personalExp: (data.fixedExpenses||[]).length + (data.variableExpenses||[]).length + (data.dailyRegister||[]).length,
    subscriptions: (data.subscriptions||[]).length,
    bizInc: (data.businessIncome||[]).length,
    bizExp: (data.businessExpenses||[]).length,
    crm: (data.crmContacts||[]).length,
    tickets: (data.tickets||[]).length,
    goals: (data.savingsGoals||[]).length,
    debts: (data.debts||[]).length,
  };

  return (
    <div>
      <div className="card">
        <h2 className="text-xl font-bold text-primary mb-4">☁️ Sincronización con Google Sheets</h2>
        <p className="text-muted-foreground mb-6">
          Próximamente: sincroniza tus finanzas con Google Sheets para tener un backup en la nube.
        </p>
        
        <div className="p-6 rounded-lg bg-gray-50 mb-6">
          <h3 className="font-bold mb-4">📊 Resumen de datos actuales</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-white rounded-lg border"><div className="text-xs text-muted-foreground">Ingresos Personal</div><div className="text-xl font-bold text-green">{stats.personalInc}</div></div>
            <div className="p-3 bg-white rounded-lg border"><div className="text-xs text-muted-foreground">Gastos Personal</div><div className="text-xl font-bold text-red">{stats.personalExp}</div></div>
            <div className="p-3 bg-white rounded-lg border"><div className="text-xs text-muted-foreground">Suscripciones</div><div className="text-xl font-bold text-blue">{stats.subscriptions}</div></div>
            <div className="p-3 bg-white rounded-lg border"><div className="text-xs text-muted-foreground">CRM</div><div className="text-xl font-bold text-orange">{stats.crm}</div></div>
            <div className="p-3 bg-white rounded-lg border"><div className="text-xs text-muted-foreground">Ingresos Negocio</div><div className="text-xl font-bold text-green">{stats.bizInc}</div></div>
            <div className="p-3 bg-white rounded-lg border"><div className="text-xs text-muted-foreground">Gastos Negocio</div><div className="text-xl font-bold text-red">{stats.bizExp}</div></div>
            <div className="p-3 bg-white rounded-lg border"><div className="text-xs text-muted-foreground">Tickets</div><div className="text-xl font-bold text-purple">{stats.tickets}</div></div>
            <div className="p-3 bg-white rounded-lg border"><div className="text-xs text-muted-foreground">Metas Ahorro</div><div className="text-xl font-bold text-teal">{stats.goals}</div></div>
            <div className="p-3 bg-white rounded-lg border"><div className="text-xs text-muted-foreground">Deudas</div><div className="text-xl font-bold text-red">{stats.debts}</div></div>
          </div>
        </div>

        <div className="p-6 rounded-lg bg-blue-light">
          <h3 className="font-bold mb-2">🔗 Próximamente</h3>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Exportar datos a Google Sheets</li>
            <li>Sincronización automática</li>
            <li>Backup en Google Drive</li>
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            Necesitas configurar tu API key de Google Sheets en la variable de entorno:
            <code className="block bg-gray-100 p-2 rounded mt-2 font-mono text-xs">GOOGLE_SHEETS_API_KEY=tu_clave_aqui</code>
          </p>
        </div>
      </div>
    </div>
  );
}

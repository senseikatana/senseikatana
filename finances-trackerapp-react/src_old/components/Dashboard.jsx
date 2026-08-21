import { defaultData, MONTHS, CURRENT_MONTH, CURRENT_YEAR, sampleData } from '../data/defaultData';

export default function Dashboard({ data, setData }) {
  const handleLoadSample = () => {
    if (confirm('¿Estás seguro de que quieres cargar los datos de ejemplo? Esto sobrescribirá tus datos actuales.')) {
      setData(sampleData);
    }
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `finanzas_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (parsed && typeof parsed === 'object' && parsed.settings) {
          setData(parsed);
          alert('¡Datos importados con éxito!');
        } else {
          alert('Error: El archivo JSON no tiene el formato correcto de Finanzas App.');
        }
      } catch (err) {
        alert('Error al leer el archivo JSON.');
      }
    };
    reader.readAsText(file);
  };

  const handleClear = () => {
    if (confirm('¿Estás seguro de que quieres borrar todos tus datos? Esta acción es irreversible.')) {
      setData(defaultData);
    }
  };

  const selectedMonth = data.settings.month || CURRENT_MONTH;
  const selectedYear = Number(data.settings.year || CURRENT_YEAR);

  const isSelectedPeriod = (dateStr) => {
    if (!dateStr) return false;
    const [y, m] = dateStr.split('-');
    const monthIndex = parseInt(m, 10) - 1;
    const itemMonth = MONTHS[monthIndex];
    const itemYear = parseInt(y, 10);
    return itemMonth === selectedMonth && itemYear === selectedYear;
  };

  const incomeTotal = data.income
    .filter(i => isSelectedPeriod(i.date))
    .reduce((s, i) => s + Number(i.amount), 0);

  const fixedTotal = data.fixedExpenses.reduce((s, e) => s + Number(e.amount), 0);

  const varTotal = data.variableExpenses
    .filter(e => isSelectedPeriod(e.date))
    .reduce((s, e) => s + Number(e.amount), 0);

  const dailyTotal = (data.dailyRegister || [])
    .filter(e => isSelectedPeriod(e.date))
    .reduce((s, e) => s + Number(e.amount), 0);

  const subsMonthly = data.subscriptions
    .filter(s => s.active)
    .reduce((total, s) => {
      const amountVal = Number(s.amount) || 0;
      const monthly = s.billingCycle === 'annual' ? amountVal / 12 : amountVal;
      return total + monthly;
    }, 0);

  const totalExpenses = fixedTotal + varTotal + dailyTotal + subsMonthly;
  const netBalance = incomeTotal - totalExpenses;
  const savingsRate = incomeTotal > 0 ? (netBalance / incomeTotal) * 100 : 0;
  const totalSaved = data.savingsGoals.reduce((s, g) => s + Number(g.saved), 0);
  const totalTarget = data.savingsGoals.reduce((s, g) => s + Number(g.target), 0);
  const savingsProgress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;
  const totalDebt = data.debts.reduce((s, d) => s + Number(d.total) - Number(d.paid), 0);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', color: 'var(--primary)', margin: 0 }}>
          Panel de Control · {selectedMonth} {selectedYear}
        </h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <select 
            value={data.settings.month} 
            onChange={(e) => setData(d => ({ ...d, settings: { ...d.settings, month: e.target.value } }))}
            style={{ width: '130px', padding: '6px 10px', fontSize: '13px', borderRadius: '6px', border: '1px solid var(--border)' }}
          >
            {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <select 
            value={data.settings.year} 
            onChange={(e) => setData(d => ({ ...d, settings: { ...d.settings, year: Number(e.target.value) } }))}
            style={{ width: '90px', padding: '6px 10px', fontSize: '13px', borderRadius: '6px', border: '1px solid var(--border)' }}
          >
            {[-2, -1, 0, 1, 2].map(offset => {
              const y = CURRENT_YEAR + offset;
              return <option key={y} value={y}>{y}</option>;
            })}
          </select>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Ingresos</div>
          <div className="stat-value stat-positive">{incomeTotal.toFixed(2)}€</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Gastos</div>
          <div className="stat-value stat-negative">{totalExpenses.toFixed(2)}€</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Saldo Neto</div>
          <div className={`stat-value ${netBalance >= 0 ? 'stat-positive' : 'stat-negative'}`}>
            {netBalance >= 0 ? '+' : ''}{netBalance.toFixed(2)}€
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Tasa Ahorro</div>
          <div className="stat-value stat-positive">{savingsRate.toFixed(1)}%</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Ahorrado / Meta</div>
          <div className="stat-value stat-neutral">
            {totalSaved.toFixed(0)}€ / {totalTarget.toFixed(0)}€
          </div>
          <div className="progress-bar" style={{marginTop:'6px'}}>
            <div className={`progress-fill ${savingsProgress > 50 ? 'progress-green' : 'progress-orange'}`}
                 style={{width:`${Math.min(100, savingsProgress)}%`}} />
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Deuda Pendiente</div>
          <div className="stat-value stat-negative">{totalDebt.toFixed(2)}€</div>
          <div style={{fontSize:'11px',color:'var(--text-light)',marginTop:'2px'}}>
            {data.debts.filter(d => d.total > 0).length} deudas activas
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">Desglose de Gastos</span>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'12px'}}>
          <div style={{padding:'12px',background:'var(--blue-light)',borderRadius:'8px'}}>
            <div style={{fontSize:'11px',color:'var(--text-light)',textTransform:'uppercase'}}>Fijos</div>
            <div style={{fontSize:'18px',fontWeight:'700',color:'var(--blue)'}}>{fixedTotal.toFixed(2)}€</div>
          </div>
          <div style={{padding:'12px',background:'var(--orange-light)',borderRadius:'8px'}}>
            <div style={{fontSize:'11px',color:'var(--text-light)',textTransform:'uppercase'}}>Variables</div>
            <div style={{fontSize:'18px',fontWeight:'700',color:'var(--orange)'}}>{varTotal.toFixed(2)}€</div>
          </div>
          <div style={{padding:'12px',background:'var(--red-light)',borderRadius:'8px'}}>
            <div style={{fontSize:'11px',color:'var(--text-light)',textTransform:'uppercase'}}>Registro Diario</div>
            <div style={{fontSize:'18px',fontWeight:'700',color:'var(--red)'}}>{dailyTotal.toFixed(2)}€</div>
          </div>
          <div style={{padding:'12px',background:'var(--green-light)',borderRadius:'8px'}}>
            <div style={{fontSize:'11px',color:'var(--text-light)',textTransform:'uppercase'}}>Suscripciones/mes</div>
            <div style={{fontSize:'18px',fontWeight:'700',color:'var(--green)'}}>{subsMonthly.toFixed(2)}€</div>
          </div>
          <div style={{padding:'12px',background:'var(--gray-light)',borderRadius:'8px'}}>
            <div style={{fontSize:'11px',color:'var(--text-light)',textTransform:'uppercase'}}>Total Gastos</div>
            <div style={{fontSize:'18px',fontWeight:'700',color:'var(--primary)'}}>{totalExpenses.toFixed(2)}€</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">Suscripciones Activas</span>
        </div>
        {data.subscriptions.filter(s => s.active).length === 0 ? (
          <div className="empty-state"><div className="empty-state-text">Sin suscripciones activas</div></div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead><tr>
                <th>Servicio</th><th>Ciclo</th><th>Importe</th><th>Próximo Pago</th><th>Coste/mes</th>
              </tr></thead>
              <tbody>
                {data.subscriptions.filter(s => s.active).map(s => {
                  const amountVal = Number(s.amount) || 0;
                  const monthly = s.billingCycle === 'annual' ? amountVal / 12 : amountVal;
                  return (
                    <tr key={s.id}>
                      <td><strong>{s.name}</strong><br /><span className="text-muted">{s.category}</span></td>
                      <td><span className={`badge ${s.billingCycle === 'annual' ? 'badge-blue' : 'badge-green'}`}>{s.billingCycle === 'annual' ? 'Anual' : 'Mensual'}</span></td>
                      <td className="text-right"><strong>{amountVal.toFixed(2)}€</strong></td>
                      <td style={{fontSize:'12px'}}>{s.nextPayment}</td>
                      <td className="text-right">{monthly.toFixed(2)}€</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">Metas de Ahorro</span>
        </div>
        <div className="stats-grid" style={{gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))'}}>
          {data.savingsGoals.map(g => {
            const pct = g.target > 0 ? (g.saved / g.target) * 100 : 0;
            return (
              <div key={g.id} className="goal-card">
                <div className="goal-header">
                  <span className="goal-name">{g.name}</span>
                  <span className="goal-amount">{g.saved.toFixed(0)}€ / {g.target.toFixed(0)}€</span>
                </div>
                <div className="progress-bar">
                  <div className={`progress-fill ${pct >= 75 ? 'progress-green' : pct >= 40 ? 'progress-orange' : 'progress-red'}`}
                       style={{width:`${Math.min(100, pct)}%`}} />
                </div>
                <div style={{fontSize:'11px',color:'var(--text-light)',marginTop:'4px',textAlign:'right'}}>
                  {pct.toFixed(0)}% completado
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">💾 Gestión de Datos</span>
        </div>
        <p style={{fontSize:'12px',color:'var(--text-light)',marginBottom:'16px'}}>
          Administra la persistencia de tus finanzas. Puedes exportar e importar copias de seguridad en formato JSON para transferir tus datos entre diferentes puertos locales (como el de desarrollo y el de vista previa) o a producción, así como cargar datos ficticios para demostraciones y pruebas rápidas.
        </p>
        <div style={{display:'flex',flexWrap:'wrap',gap:'10px'}}>
          <button className="btn btn-primary" onClick={handleLoadSample}>
            Cargar Datos de Ejemplo
          </button>
          <button className="btn btn-ghost" onClick={handleExport}>
            📥 Exportar Backup (JSON)
          </button>
          <button className="btn btn-ghost" style={{position:'relative',overflow:'hidden'}}>
            📤 Importar Backup (JSON)
            <input 
              type="file" 
              accept=".json" 
              onChange={handleImport} 
              style={{position:'absolute',top:0,left:0,opacity:0,width:'100%',height:'100%',cursor:'pointer'}} 
            />
          </button>
          <button className="btn btn-red" onClick={handleClear} style={{marginLeft:'auto'}}>
            🗑️ Limpiar Todo
          </button>
        </div>
      </div>
    </div>
  );
}

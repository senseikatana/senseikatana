import { MONTHS, CURRENT_MONTH, CURRENT_YEAR } from '../data/defaultData';

export default function Budget({ data, setData }) {
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

  const totalExpenses = (cat) => {
    const fromFixed = data.fixedExpenses
      .filter(e => e.category === cat)
      .reduce((s, e) => s + Number(e.amount), 0);
    const fromVar = data.variableExpenses
      .filter(e => e.category === cat && isSelectedPeriod(e.date))
      .reduce((s, e) => s + Number(e.amount), 0);
    const fromDaily = (data.dailyRegister || [])
      .filter(e => e.category === cat && isSelectedPeriod(e.date))
      .reduce((s, e) => s + Number(e.amount), 0);
    return fromFixed + fromVar + fromDaily;
  };

  const updatePlanned = (category, value) => setData(d => ({
    ...d, budget: d.budget.map(b => b.category === category ? { ...b, planned: Number(value) } : b)
  }));

  const totalPlanned = data.budget.reduce((s, b) => s + Number(b.planned), 0);
  const totalReal = data.budget.reduce((s, b) => s + totalExpenses(b.category), 0);

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <span className="card-title">Presupuesto Mensual · {selectedMonth} {selectedYear}</span>
        </div>
        <p style={{fontSize:'12px',color:'var(--text-light)',marginBottom:'12px'}}>
          Define cuánto quieres gastar en cada categoría. Los datos reales se calculan automáticamente desde tus gastos registrados.
        </p>
        <div className="table-wrapper">
          <table>
            <thead><tr>
              <th>Categoría</th><th className="text-right">Presupuestado</th><th className="text-right">Real</th>
              <th className="text-right">Diferencia</th><th>Desviación</th><th style={{textAlign:'center'}}>Estado</th>
            </tr></thead>
            <tbody>
              {data.budget.map(b => {
                const real = totalExpenses(b.category);
                const diff = real - b.planned;
                const dev = b.planned > 0 ? (diff / b.planned) * 100 : 0;
                const status = diff <= 0 ? '✅' : dev <= 10 ? '⚠️' : '❌';
                const statusColor = diff <= 0 ? 'var(--green-light)' : dev <= 10 ? 'var(--orange-light)' : 'var(--red-light)';
                return (
                  <tr key={b.category} style={{background: real > b.planned && b.planned > 0 ? statusColor : ''}}>
                    <td><strong>{b.category}</strong></td>
                    <td className="text-right">
                      <input type="number" step="0.01" min="0" value={b.planned}
                             onChange={e => updatePlanned(b.category, e.target.value)}
                             className="text-right" style={{width:'90px',border:'none',background:'transparent',fontWeight:'600'}} />
                    </td>
                    <td className="text-right">{real.toFixed(2)}€</td>
                    <td className="text-right" style={{color: diff > 0 ? 'var(--red)' : 'var(--green)', fontWeight:'600'}}>
                      {diff > 0 ? '+' : ''}{diff.toFixed(2)}€
                    </td>
                    <td className="text-right" style={{color: dev > 10 ? 'var(--red)' : dev > 5 ? 'var(--orange)' : 'var(--green)'}}>
                      {b.planned > 0 ? (dev > 0 ? '+' : '') + dev.toFixed(1) + '%' : '—'}
                    </td>
                    <td style={{textAlign:'center',fontSize:'18px'}}>{status}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr style={{background:'var(--blue-light)',fontWeight:'700'}}>
                <td>TOTAL</td>
                <td className="text-right">{totalPlanned.toFixed(2)}€</td>
                <td className="text-right">{totalReal.toFixed(2)}€</td>
                <td className="text-right" style={{color: totalReal > totalPlanned ? 'var(--red)' : 'var(--green)'}}>
                  {(totalReal - totalPlanned) > 0 ? '+' : ''}{(totalReal - totalPlanned).toFixed(2)}€
                </td>
                <td className="text-right">{totalPlanned > 0 ? (((totalReal - totalPlanned) / totalPlanned) * 100).toFixed(1) + '%' : '—'}</td>
                <td style={{textAlign:'center',fontSize:'18px'}}>{totalReal <= totalPlanned ? '✅' : '❌'}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

import { MONTHS, CURRENT_MONTH, CURRENT_YEAR } from '@/data/defaultData';

export function buildFinancialSummary(data) {
  if (!data) return 'Sin datos disponibles.';
  
  const month = data.settings?.month || CURRENT_MONTH;
  const year = Number(data.settings?.year || CURRENT_YEAR);
  
  const isSelectedPeriod = (dateStr) => {
    if (!dateStr) return false;
    const [y, m] = dateStr.split('-');
    const monthIndex = parseInt(m, 10) - 1;
    return MONTHS[monthIndex] === month && parseInt(y, 10) === year;
  };

  const num = (n) => Number(n) || 0;
  const fmt = (n) => num(n).toFixed(2);

  const incomeTotal = (data.income || []).filter(i => isSelectedPeriod(i.date)).reduce((s, i) => s + num(i.amount), 0);
  const fixedTotal = (data.fixedExpenses || []).reduce((s, e) => s + num(e.amount), 0);
  const varTotal = (data.variableExpenses || []).filter(e => isSelectedPeriod(e.date)).reduce((s, e) => s + num(e.amount), 0);
  const dailyTotal = (data.dailyRegister || []).filter(e => isSelectedPeriod(e.date)).reduce((s, e) => s + num(e.amount), 0);
  const subsMonthly = (data.subscriptions || []).filter(s => s.active).reduce((t, s) => {
    const a = num(s.amount);
    return t + (s.billingCycle === 'annual' ? a / 12 : a);
  }, 0);

  const totalExpenses = fixedTotal + varTotal + dailyTotal + subsMonthly;
  const netBalance = incomeTotal - totalExpenses;
  const savingsRate = incomeTotal > 0 ? (netBalance / incomeTotal) * 100 : 0;

  let summary = `PERIODO: ${month} ${year}\n\n`;
  summary += `${data.settings?.currency || '€'} RESUMEN\n`;
  summary += `Ingresos: ${fmt(incomeTotal)} | Gastos: ${fmt(totalExpenses)}\n`;
  summary += `Saldo: ${fmt(netBalance)} | Ahorro: ${savingsRate.toFixed(1)}%\n\n`;

  if ((data.savingsGoals || []).length > 0) {
    summary += `METAS:\n`;
    data.savingsGoals.forEach(g => {
      const pct = g.target > 0 ? (num(g.saved) / num(g.target)) * 100 : 0;
      summary += `- ${g.name}: ${fmt(g.saved)}/${fmt(g.target)} (${pct.toFixed(0)}%)\n`;
    });
    summary += '\n';
  }

  if ((data.debts || []).length > 0) {
    summary += `DEUDAS:\n`;
    data.debts.forEach(d => {
      const rest = num(d.total) - num(d.paid);
      summary += `- ${d.creditor} ${d.concept}: ${fmt(rest)} restantes\n`;
    });
    summary += '\n';
  }

  // Business summary
  const bizIncome = (data.businessIncome || []).filter(i => isSelectedPeriod(i.date)).reduce((s, i) => s + num(i.amount), 0);
  const bizExpenses = (data.businessExpenses || []).filter(e => isSelectedPeriod(e.date)).reduce((s, e) => s + num(e.amount), 0);
  
  if (bizIncome > 0 || bizExpenses > 0) {
    summary += `NEGOCIO:\n`;
    summary += `Ingresos: ${fmt(bizIncome)} | Gastos: ${fmt(bizExpenses)}`;
    summary += ` | Neto: ${fmt(bizIncome - bizExpenses)}\n`;
  }

  // CRM summary
  const activeDeals = (data.crmContacts || []).filter(c => !['Ganado','Perdido','Archivado'].includes(c.status));
  if (activeDeals.length > 0) {
    summary += `\nCRM: ${activeDeals.length} tratos activos\n`;
  }

  return summary;
}


import { MONTHS, CURRENT_MONTH, CURRENT_YEAR } from '@/data/defaultData';

export function buildFinancialSummary(data: any) {
  if (!data) return 'Sin datos disponibles.';
  
  const month: string = data.settings?.month || CURRENT_MONTH || '';
  const year: number = Number(data.settings?.year || CURRENT_YEAR) || new Date().getFullYear();
  
  const isSelectedPeriod = (dateStr: any) => {
    if (!dateStr) return false;
    const parts = String(dateStr).split('-');
    if (parts.length < 2) return false;
    const monthIndex = parseInt(parts[1] || '0', 10) - 1;
    const storedMonth = MONTHS[monthIndex] as string | undefined;
    return storedMonth === month && parseInt(parts[0] || '0', 10) === year;
  };

  const num = (n: any) => Number(n) || 0;
  const fmt = (n: any) => num(n).toFixed(2);

  const incomeTotal = (data.income || []).filter((i: any) => isSelectedPeriod(i.date)).reduce((s: number, i: any) => s + num(i.amount), 0);
  const fixedTotal = (data.fixedExpenses || []).reduce((s: number, e: any) => s + num(e.amount), 0);
  const varTotal = (data.variableExpenses || []).filter((e: any) => isSelectedPeriod(e.date)).reduce((s: number, e: any) => s + num(e.amount), 0);
  const dailyTotal = (data.dailyRegister || []).filter((e: any) => isSelectedPeriod(e.date)).reduce((s: number, e: any) => s + num(e.amount), 0);
  const subsMonthly = (data.subscriptions || []).filter((s: any) => s.active).reduce((t: number, s: any) => {
    const a = num(s.amount);
    return t + (s.billingCycle === 'annual' ? a / 12 : a);
  }, 0);

  const totalExpenses = fixedTotal + varTotal + dailyTotal + subsMonthly;
  const netBalance = incomeTotal - totalExpenses;
  const savingsRate = incomeTotal > 0 ? (netBalance / incomeTotal) * 100 : 0;

  let summary = `PERIODO: ${month} ${year}\n\n`;
  summary += `RESUMEN FINANCIERO\n`;
  summary += `Ingresos: ${fmt(incomeTotal)} | Gastos: ${fmt(totalExpenses)}\n`;
  summary += `Saldo: ${fmt(netBalance)} | Ahorro: ${savingsRate.toFixed(1)}%\n\n`;

  if ((data.savingsGoals || []).length > 0) {
    summary += `METAS DE AHORRO:\n`;
    data.savingsGoals.forEach((g: any) => {
      const pct = g.target > 0 ? (num(g.saved) / num(g.target)) * 100 : 0;
      summary += `- ${g.name}: ${fmt(g.saved)}/${fmt(g.target)} (${pct.toFixed(0)}%)\n`;
    });
    summary += '\n';
  }

  if ((data.debts || []).length > 0) {
    summary += `DEUDAS:\n`;
    data.debts.forEach((d: any) => {
      const rest = num(d.total) - num(d.paid);
      summary += `- ${d.creditor} ${d.concept}: ${fmt(rest)} restantes\n`;
    });
    summary += '\n';
  }

  const bizIncome = (data.businessIncome || []).filter((i: any) => isSelectedPeriod(i.date)).reduce((s: number, i: any) => s + num(i.amount), 0);
  const bizExpenses = (data.businessExpenses || []).filter((e: any) => isSelectedPeriod(e.date)).reduce((s: number, e: any) => s + num(e.amount), 0);
  
  if (bizIncome > 0 || bizExpenses > 0) {
    summary += `NEGOCIO:\n`;
    summary += `Ingresos: ${fmt(bizIncome)} | Gastos: ${fmt(bizExpenses)}\n`;
  }

  return summary;
}


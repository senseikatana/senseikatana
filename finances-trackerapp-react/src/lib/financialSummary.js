import { MONTHS, CURRENT_MONTH, CURRENT_YEAR } from '../data/defaultData';

export function buildFinancialSummary(data) {
  const d = data || {};
  const month = d.settings?.month || CURRENT_MONTH;
  const year = Number(d.settings?.year || CURRENT_YEAR);

  const isSelectedPeriod = (dateStr) => {
    if (!dateStr) return false;
    const [y, m] = dateStr.split('-');
    const idx = parseInt(m, 10) - 1;
    return MONTHS[idx] === month && parseInt(y, 10) === year;
  };

  const num = (n) => Number(n) || 0;

  const incomeTotal = (d.income || []).filter(i => isSelectedPeriod(i.date)).reduce((s, i) => s + num(i.amount), 0);
  const fixedTotal = (d.fixedExpenses || []).reduce((s, e) => s + num(e.amount), 0);
  const varTotal = (d.variableExpenses || []).filter(e => isSelectedPeriod(e.date)).reduce((s, e) => s + num(e.amount), 0);
  const dailyTotal = (d.dailyRegister || []).filter(e => isSelectedPeriod(e.date)).reduce((s, e) => s + num(e.amount), 0);
  const subsMonthly = (d.subscriptions || []).filter(s => s.active).reduce((t, s) => {
    const a = num(s.amount);
    return t + (s.billingCycle === 'annual' ? a / 12 : a);
  }, 0);

  const totalExpenses = fixedTotal + varTotal + dailyTotal + subsMonthly;
  const netBalance = incomeTotal - totalExpenses;
  const savingsRate = incomeTotal > 0 ? (netBalance / incomeTotal) * 100 : 0;

  const budgetRows = (d.budget || []).map(b => {
    const real = (d.fixedExpenses || []).filter(e => e.category === b.category).reduce((s, e) => s + num(e.amount), 0)
      + (d.variableExpenses || []).filter(e => e.category === b.category && isSelectedPeriod(e.date)).reduce((s, e) => s + num(e.amount), 0)
      + (d.dailyRegister || []).filter(e => e.category === b.category && isSelectedPeriod(e.date)).reduce((s, e) => s + num(e.amount), 0);
    return { cat: b.category, planned: num(b.planned), real, diff: real - num(b.planned) };
  }).filter(r => r.planned > 0 || r.real > 0);

  const totalSaved = (d.savingsGoals || []).reduce((s, g) => s + num(g.saved), 0);
  const totalTarget = (d.savingsGoals || []).reduce((s, g) => s + num(g.target), 0);
  const totalDebt = (d.debts || []).reduce((s, x) => s + num(x.total) - num(x.paid), 0);

  let summary = `PERIODO: ${month} ${year}\n`;
  summary += `Moneda: ${d.settings?.currency || '€'}\n\n`;
  summary += `--- RESUMEN ---\n`;
  summary += `Ingresos del mes: ${incomeTotal.toFixed(2)}\n`;
  summary += `Gastos totales: ${totalExpenses.toFixed(2)} (Fijos ${fixedTotal.toFixed(2)}, Variables ${varTotal.toFixed(2)}, Diario ${dailyTotal.toFixed(2)}, Suscripciones ${subsMonthly.toFixed(2)})\n`;
  summary += `Saldo neto: ${netBalance.toFixed(2)}\n`;
  summary += `Tasa de ahorro: ${savingsRate.toFixed(1)}%\n\n`;

  if (budgetRows.length > 0) {
    summary += `--- PRESUPUESTO vs REAL ---\n`;
    budgetRows.forEach(r => {
      summary += `${r.cat}: plan ${r.planned.toFixed(2)} / real ${r.real.toFixed(2)} / diff ${r.diff >= 0 ? '+' : ''}${r.diff.toFixed(2)}\n`;
    });
    summary += `\n`;
  }

  if ((d.savingsGoals || []).length > 0) {
    summary += `--- METAS DE AHORRO ---\n`;
    (d.savingsGoals || []).forEach(g => {
      const pct = g.target > 0 ? (num(g.saved) / num(g.target)) * 100 : 0;
      summary += `${g.name}: ${num(g.saved).toFixed(2)}/${num(g.target).toFixed(2)} (${pct.toFixed(0)}%)\n`;
    });
    summary += `Total ahorrado: ${totalSaved.toFixed(2)} / ${totalTarget.toFixed(2)}\n\n`;
  }

  if ((d.debts || []).length > 0) {
    summary += `--- DEUDAS ---\n`;
    (d.debts || []).forEach(x => {
      const rest = num(x.total) - num(x.paid);
      summary += `${x.creditor} - ${x.concept}: total ${num(x.total).toFixed(2)}, pagado ${num(x.paid).toFixed(2)}, resta ${rest.toFixed(2)}, cuota ${num(x.monthlyPayment).toFixed(2)}/mes\n`;
    });
    summary += `Deuda pendiente total: ${totalDebt.toFixed(2)}\n\n`;
  }

  const incomes = (d.income || []).filter(i => isSelectedPeriod(i.date));
  if (incomes.length > 0 && incomes.length <= 10) {
    summary += `--- INGRESOS DETALLADOS ---\n`;
    incomes.forEach(i => summary += `${i.date} ${i.category} "${i.concept}" ${num(i.amount).toFixed(2)}\n`);
    summary += `\n`;
  }

  const vars = (d.variableExpenses || []).filter(e => isSelectedPeriod(e.date));
  if (vars.length > 0 && vars.length <= 15) {
    summary += `--- GASTOS VARIABLES DEL MES ---\n`;
    vars.forEach(e => summary += `${e.date} ${e.category} "${e.concept}" ${num(e.amount).toFixed(2)}${e.necessary ? '' : ' (capricho)'}\n`);
  }

  return summary;
}

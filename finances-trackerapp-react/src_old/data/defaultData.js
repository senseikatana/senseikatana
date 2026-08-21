const today = new Date();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();
const months = [
  'Enero', 
  'Febrero', 
  'Marzo', 
  'Abril', 
  'Mayo', 
  'Junio',
  'Julio', 
  'Agosto', 
  'Septiembre', 
  'Octubre', 
  'Noviembre', 
  'Diciembre',
];

export const MONTHS = months;
export const CURRENT_MONTH = months[currentMonth];
export const CURRENT_YEAR = currentYear;

export const EXPENSE_CATEGORIES = [
  'Alimentación', 'Restaurantes', 'Transporte', 'Ocio', 'Ropa',
  'Salud', 'Hogar', 'Tecnología', 'Regalos', 'Viajes', 'Mascotas', 'Otros',
];

export const INCOME_CATEGORIES = [
  'Nómina', 'Freelance', 'Inversiones', 'Ventas', 'Regalos', 'Reintegros', 'Otros',
];

export const FIXED_CATEGORIES = [
  'Vivienda', 'Suscripciones', 'Seguros', 'Transporte', 'Finanzas', 'Educación',
];

export const defaultData = {
  settings: {
    currency: '€',
    month: CURRENT_MONTH,
    year: CURRENT_YEAR,
  },

  incomeCategories: [...INCOME_CATEGORIES],
  fixedCategories: [...FIXED_CATEGORIES],
  expenseCategories: [...EXPENSE_CATEGORIES],

  income: [],

  fixedExpenses: [],

  subscriptions: [],

  variableExpenses: [],

  dailyRegister: [],

  budget: [
    { category: 'Vivienda', planned: 0 },
    { category: 'Suscripciones', planned: 0 },
    { category: 'Seguros', planned: 0 },
    { category: 'Transporte', planned: 0 },
    { category: 'Alimentación', planned: 0 },
    { category: 'Restaurantes', planned: 0 },
    { category: 'Ocio', planned: 0 },
    { category: 'Ropa', planned: 0 },
    { category: 'Salud', planned: 0 },
    { category: 'Otros', planned: 0 },
  ],

  savingsGoals: [],

  debts: [],
};

export const sampleData = {
  settings: {
    currency: '€',
    month: CURRENT_MONTH,
    year: CURRENT_YEAR,
  },

  incomeCategories: [...INCOME_CATEGORIES],
  fixedCategories: [...FIXED_CATEGORIES],
  expenseCategories: [...EXPENSE_CATEGORIES],

  income: [
    { id: 1, date: new Date().toISOString().split('T')[0], category: 'Nómina', concept: 'Nómina mensual', amount: 2400, notes: 'Ingreso principal' },
    { id: 2, date: new Date().toISOString().split('T')[0], category: 'Freelance', concept: 'Proyecto desarrollo', amount: 650, notes: 'Trabajo extra' },
  ],

  fixedExpenses: [
    { id: 1, category: 'Vivienda', concept: 'Alquiler / Hipoteca', provider: 'Casero', amount: 650, dueDate: 1, paid: true },
    { id: 2, category: 'Vivienda', concept: 'Luz y Agua', provider: 'Endesa', amount: 85, dueDate: 10, paid: true },
    { id: 3, category: 'Transporte', concept: 'Abono Transporte', provider: 'Metro', amount: 54, dueDate: 3, paid: true },
    { id: 4, category: 'Finanzas', concept: 'Teléfono móvil', provider: 'Movistar', amount: 35, dueDate: 1, paid: false },
    { id: 5, category: 'Suscripciones', concept: 'Netflix', provider: 'Netflix Inc', amount: 17.99, dueDate: 15, paid: false },
  ],

  subscriptions: [
    {
      id: 1,
      name: 'Google One',
      category: 'Almacenamiento',
      provider: 'Google',
      amount: 1.99,
      billingCycle: 'monthly',
      nextPayment: new Date(CURRENT_YEAR, currentMonth + 1, 1).toISOString().split('T')[0],
      active: true,
      notes: '100 GB de almacenamiento',
    },
    {
      id: 2,
      name: 'Spotify Family',
      category: 'Música',
      provider: 'Spotify',
      amount: 17.99,
      billingCycle: 'monthly',
      nextPayment: new Date(CURRENT_YEAR, currentMonth + 1, 10).toISOString().split('T')[0],
      active: true,
      notes: 'Plan Familiar',
    },
    {
      id: 3,
      name: 'Amazon Prime',
      category: 'Streaming / Envíos',
      provider: 'Amazon',
      amount: 49.90,
      billingCycle: 'annual',
      nextPayment: new Date(CURRENT_YEAR + 1, 0, 15).toISOString().split('T')[0],
      active: true,
      notes: 'Suscripción anual',
    },
  ],

  variableExpenses: [
    { id: 1, date: new Date().toISOString().split('T')[0], category: 'Alimentación', concept: 'Compra Mercadona', amount: 84.50, necessary: true, notes: 'Compra mensual' },
    { id: 2, date: new Date().toISOString().split('T')[0], category: 'Restaurantes', concept: 'Cena amigos', amount: 32.00, necessary: false, notes: 'Fin de semana' },
    { id: 3, date: new Date().toISOString().split('T')[0], category: 'Ocio', concept: 'Entrada Cine', amount: 9.50, necessary: false, notes: 'Estreno' },
  ],

  dailyRegister: [],

  budget: [
    { category: 'Vivienda', planned: 750 },
    { category: 'Suscripciones', planned: 30 },
    { category: 'Seguros', planned: 50 },
    { category: 'Transporte', planned: 80 },
    { category: 'Alimentación', planned: 250 },
    { category: 'Restaurantes', planned: 120 },
    { category: 'Ocio', planned: 100 },
    { category: 'Ropa', planned: 60 },
    { category: 'Salud', planned: 40 },
    { category: 'Otros', planned: 100 },
  ],

  savingsGoals: [
    { id: 1, name: 'Fondo de emergencia', target: 5000, saved: 2500 },
    { id: 2, name: 'Vacaciones de Verano', target: 1500, saved: 600 },
  ],

  debts: [
    { id: 1, creditor: 'Banco', concept: 'Préstamo Coche', total: 8000, paid: 3200, monthlyPayment: 150, notes: 'Interés 4%' },
  ],
};


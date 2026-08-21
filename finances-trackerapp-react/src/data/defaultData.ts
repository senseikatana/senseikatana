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

// ============================================
// BUSINESS FINANCE CATEGORIES
// ============================================
export const BUSINESS_EXPENSE_CATEGORIES = [
  'Proveedores', 'Materiales', 'Nómina', 'Alquiler Oficina', 'Servicios',
  'Marketing', 'Logística', 'Honorarios', 'Impuestos', 'Seguros', 'Otros',
];

export const BUSINESS_INCOME_CATEGORIES = [
  'Ventas', 'Servicios', 'Consultoría', 'Proyectos', 'Comisiones', 'Subvenciones', 'Otros',
];

// ============================================
// CRM CATEGORIES
// ============================================
export const CRM_DEAL_TYPES = [
  'Cliente', 'Proveedor', 'Lead', 'Partner', 'Inversor', 'Otro',
];

export const CRM_DEAL_STATUSES = [
  'Prospecto', 'Contactado', 'En negociación', 'Propuesta enviada', 
  'Ganado', 'Perdido', 'Archivado',
];

export const TICKET_CATEGORIES = [
  'Alimentación', 'Transporte', 'Oficina', 'Suministros', 'Marketing',
  'Restaurantes', 'Hospedaje', 'Viajes', 'Otros',
];

export const TICKET_STATUS = [
  'Pendiente', 'Procesado', 'Validado', 'Archivado', 'Rechazado',
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

  // ---- Business Finance ----
  businessIncomeCategories: [...BUSINESS_INCOME_CATEGORIES],
  businessExpenseCategories: [...BUSINESS_EXPENSE_CATEGORIES],

  businessIncome: [],
  businessExpenses: [],
  businessBudget: [
    { category: 'Proveedores', planned: 0 },
    { category: 'Nómina', planned: 0 },
    { category: 'Alquiler Oficina', planned: 0 },
    { category: 'Servicios', planned: 0 },
    { category: 'Marketing', planned: 0 },
    { category: 'Logística', planned: 0 },
    { category: 'Honorarios', planned: 0 },
    { category: 'Impuestos', planned: 0 },
    { category: 'Seguros', planned: 0 },
    { category: 'Otros', planned: 0 },
  ],

  // ---- CRM ----
  crmContacts: [],
  crmCategories: [...CRM_DEAL_TYPES],

  // ---- Tickets / Receipts ----
  ticketCategories: [...TICKET_CATEGORIES],
  tickets: [],
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

  // ---- Business Income ----
  businessIncome: [
    { id: 1, date: '2025-01-05', category: 'Servicios', concept: 'Consultoría web', amount: 1200, client: 'Tech Corp', notes: 'Mensual' },
    { id: 2, date: '2025-01-15', category: 'Proyectos', concept: 'Desarrollo app', amount: 3500, client: 'StartUp Inc', notes: '30% anticipo' },
  ],

  // ---- Business Expenses ----
  businessExpenses: [
    { id: 1, date: '2025-01-01', category: 'Proveedores', concept: 'Licencia software', amount: 49, provider: 'Adobe', notes: 'Mensual' },
    { id: 2, date: '2025-01-10', category: 'Marketing', concept: 'Anuncios Google Ads', amount: 150, provider: 'Google', notes: 'Campaña Q1' },
    { id: 3, date: '2025-01-15', category: 'Servicios', concept: 'Dominio web', amount: 15, provider: 'Namecheap', notes: 'Anual' },
  ],

  // ---- Business Budget ----
  businessBudget: [
    { category: 'Proveedores', planned: 500 },
    { category: 'Servicios', planned: 200 },
    { category: 'Marketing', planned: 300 },
    { category: 'Logística', planned: 100 },
    { category: 'Otros', planned: 100 },
  ],

  // ---- CRM Contacts ----
  crmContacts: [
    { id: 1, name: 'Tech Corp', type: 'Cliente', status: 'Ganado', value: 15000, phone: '+34 612345678', email: 'info@techcorp.com', notes: 'Cliente recurrente', lastContact: '2025-01-15' },
    { id: 2, name: 'StartUp Inc', type: 'Cliente', status: 'En negociación', value: 8000, phone: '+34 698765432', email: 'hola@startup.com', notes: 'Interesados en app móvil', lastContact: '2025-01-20' },
    { id: 3, name: 'Digital Agency', type: 'Lead', status: 'Contactado', value: 5000, phone: '+34 655555555', email: 'info@agency.com', notes: 'Referidos por Tech Corp', lastContact: '2025-01-18' },
  ],

  // ---- Tickets ----
  tickets: [
    { id: 1, date: '2025-01-10', concept: 'Compra supermercado', category: 'Alimentación', amount: 84.50, type: 'personal', status: 'Procesado', files: [], notes: 'Compra semanal' },
    { id: 2, date: '2025-01-12', concept: 'Gasolina', category: 'Transporte', amount: 45.00, type: 'personal', status: 'Pendiente', files: [], notes: '' },
    { id: 3, date: '2025-01-15', concept: 'Software licencia', category: 'Oficina', amount: 99.00, type: 'negocio', status: 'Validado', files: [], notes: 'Licencia anual' },
  ],
};

// Alias for SDK compatibility
export const SAMPLE_DATA = sampleData;



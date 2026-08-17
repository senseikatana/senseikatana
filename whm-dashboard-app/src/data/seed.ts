import type { CollectionKey } from '../types';

export type SeedRow = Record<string, string | number>;

const INVENTORY: SeedRow[] = [
	{ sku: 'A-SM-1024', name: 'Smartphone Samsung A54', abcClass: 'A', stock: 8, min: 15, status: 'Bajo' },
	{ sku: 'A-LP-2048', name: 'Laptop Dell XPS 15', abcClass: 'A', stock: 3, min: 8, status: 'Crítico' },
	{ sku: 'A-TB-3072', name: 'Tablet iPad Pro', abcClass: 'A', stock: 22, min: 10, status: 'OK' },
	{ sku: 'B-MN-4096', name: 'Monitor LG 27"', abcClass: 'B', stock: 14, min: 12, status: 'OK' },
	{ sku: 'B-TC-5120', name: 'Teclado Logitech K380', abcClass: 'B', stock: 45, min: 20, status: 'OK' },
	{ sku: 'B-MS-6144', name: 'Mouse Inalámbrico', abcClass: 'B', stock: 18, min: 25, status: 'Bajo' },
	{ sku: 'B-AU-7168', name: 'Auriculares Sony WH-1000XM5', abcClass: 'B', stock: 9, min: 10, status: 'Crítico' },
	{ sku: 'B-SW-8192', name: 'Smartwatch Garmin Venu', abcClass: 'C', stock: 31, min: 8, status: 'OK' },
	{ sku: 'C-CM-9216', name: 'Cámara Canon EOS R50', abcClass: 'C', stock: 6, min: 5, status: 'OK' },
	{ sku: 'C-IM-10240', name: 'Impresora HP LaserJet', abcClass: 'C', stock: 12, min: 6, status: 'OK' },
	{ sku: 'C-RT-11264', name: 'Router TP-Link Archer', abcClass: 'C', stock: 40, min: 15, status: 'OK' },
	{ sku: 'C-SS-12288', name: 'Disco SSD 1TB Kingston', abcClass: 'C', stock: 2, min: 10, status: 'Crítico' },
];

const IN_ORDERS: SeedRow[] = [
	{ orderRef: 'IN-2026-1042', supplier: 'Samsung Distribución', items: 120, type: 'Estocaje', status: 'Completado' },
	{ orderRef: 'IN-2026-1043', supplier: 'Logitech Iberia', items: 60, type: 'Cross-Docking', status: 'Pendiente' },
	{ orderRef: 'IN-2026-1044', supplier: 'Dell EMC', items: 25, type: 'Estocaje', status: 'Descargando' },
	{ orderRef: 'IN-2026-1045', supplier: 'Sony Retail', items: 200, type: 'Estocaje', status: 'Pendiente' },
	{ orderRef: 'IN-2026-1046', supplier: 'Canon Europe', items: 40, type: 'Cross-Docking', status: 'Completado' },
];

const OUT_ORDERS: SeedRow[] = [
	{ orderRef: 'OUT-2026-2201', client: 'Mercado Libre', items: 30, type: 'Estándar', status: 'Pendiente' },
	{ orderRef: 'OUT-2026-2202', client: 'El Corte Inglés', items: 15, type: 'Cross-Docking', status: 'Pendiente' },
	{ orderRef: 'OUT-2026-2203', client: 'Amazon Vendor', items: 80, type: 'Estándar', status: 'Empacando' },
	{ orderRef: 'OUT-2026-2204', client: 'Carrefour', items: 45, type: 'Estándar', status: 'En Ruta' },
	{ orderRef: 'OUT-2026-2205', client: 'MediaMarkt', items: 60, type: 'Estándar', status: 'Completada' },
	{ orderRef: 'OUT-2026-2206', client: 'Fnac', items: 10, type: 'Cross-Docking', status: 'Pendiente' },
];

const ROUTES: SeedRow[] = [
	{ routeId: 'R-AR-01', driver: 'Carlos Méndez', status: 'En Ruta' },
	{ routeId: 'R-AR-02', driver: 'Laura Gómez', status: 'Disponible' },
	{ routeId: 'R-AR-03', driver: 'Jorge Pereyra', status: 'Cancelado' },
	{ routeId: 'R-AR-04', driver: 'Ana Sosa', status: 'En Ruta' },
];

const CRM: SeedRow[] = [
	{ code: 'CL-1001', company: 'LogistiK S.A.', leadScore: 85, status: 'En Negociación' },
	{ code: 'CL-1002', company: 'FarmaPlus', leadScore: 92, status: 'Cliente Activo' },
	{ code: 'CL-1003', company: 'RetailAndes', leadScore: 45, status: 'Nuevo Lead' },
	{ code: 'CL-1004', company: 'TechCorp Argentina', leadScore: 70, status: 'En Negociación' },
];

const USERS: SeedRow[] = [
	{ code: 'OP-1001', name: 'Martín Ruiz', role: 'admin', status: 'Activo' },
	{ code: 'OP-1002', name: 'Valentina Díaz', role: 'manager', status: 'Activo' },
	{ code: 'OP-1003', name: 'Santiago López', role: 'picker', status: 'Activo' },
	{ code: 'OP-1004', name: 'Camila Torres', role: 'picker', status: 'Inactivo' },
	{ code: 'OP-1005', name: 'Lucía Fernández', role: 'formador', status: 'Activo' },
	{ code: 'OP-1006', name: 'Prácticas Novatecnica 1', role: 'practicas', status: 'Activo' },
	{ code: 'OP-1007', name: 'Prácticas Novatecnica 2', role: 'practicas', status: 'Activo' },
];

export const seedData: Record<CollectionKey, readonly SeedRow[]> = {
	inventory: INVENTORY,
	inOrders: IN_ORDERS,
	outOrders: OUT_ORDERS,
	routes: ROUTES,
	crm: CRM,
	users: USERS,
};

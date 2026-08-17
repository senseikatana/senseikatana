import type { Doc } from '../types';

export interface PickingTask {
	id: string;
	zone: string;
	product: string;
	qty: number;
	type: string;
	destination: string;
}

const ZONES = ['A', 'B', 'C', 'D'] as const;

export function buildPickingTasks(outOrders: Doc[], inventory: Doc[]): PickingTask[] {
	const candidates = outOrders.filter(
		(order) => order.status === 'Pendiente' || order.status === 'Cross-Docking',
	);

	return candidates
		.map((order, index) => {
			const product = inventory[index % Math.max(1, inventory.length)];
			return {
				id: `TASK-${1000 + index}`,
				zone: `Pasillo ${ZONES[index % ZONES.length]}`,
				product: String(product?.name ?? order.orderRef ?? order.client ?? 'Producto'),
				qty: Number(order.items) || 0,
				type: order.type === 'Cross-Docking' ? 'Cross-Docking' : 'Estándar',
				destination: String(order.client ?? ''),
			};
		})
		.sort((a, b) => a.zone.localeCompare(b.zone));
}
